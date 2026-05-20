"""
Mason IT Care — FastAPI backend
All routes prefixed with /api
"""
import os
import uuid
import logging
from datetime import datetime, timezone
from typing import List, Optional

from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

# ---------- Config ----------
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "mason_it_care")

# ---------- Logger ----------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger("mason-it-care")

# ---------- DB ----------
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]
bookings_collection = db["bookings"]

# ---------- Models ----------
class BookingCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=7, max_length=40)
    service: str = Field(..., min_length=1)
    message: Optional[str] = ""


class Booking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    service: str
    message: Optional[str] = ""
    created_at: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )


class Service(BaseModel):
    id: str
    name: str
    description: str


# ---------- Static service catalog ----------
SERVICES: List[Service] = [
    Service(
        id="computer-repair",
        name="Computer Repair",
        description="Diagnostics, hardware fixes, performance tune-ups for desktops and laptops.",
    ),
    Service(
        id="network-setup",
        name="Network Setup",
        description="WiFi installation, mesh networks, and small-business network configuration.",
    ),
    Service(
        id="virus-removal",
        name="Virus Removal",
        description="Malware cleanup, ransomware response, and endpoint hardening.",
    ),
    Service(
        id="data-recovery",
        name="Data Recovery",
        description="File and drive recovery from failed disks, accidental deletion, and corruption.",
    ),
    Service(
        id="cloud-setup",
        name="Cloud Setup",
        description="Microsoft 365, Google Workspace, and cloud backup deployment and migration.",
    ),
    Service(
        id="software-installation",
        name="Software Installation",
        description="Licensed software setup, updates, and ongoing patch management.",
    ),
]


# ---------- App + Router ----------
app = FastAPI(title="Mason IT Care API", version="1.0.0")
api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def health_check():
    return {"status": "ok", "service": "Mason IT Care API"}


@api_router.get("/services", response_model=List[Service])
async def list_services():
    return SERVICES


@api_router.post("/bookings", response_model=Booking, status_code=201)
async def create_booking(payload: BookingCreate):
    valid_ids = {s.id for s in SERVICES}
    valid_names = {s.name for s in SERVICES}
    if payload.service not in valid_ids and payload.service not in valid_names:
        raise HTTPException(status_code=400, detail="Invalid service")

    booking = Booking(**payload.model_dump())
    doc = booking.model_dump()
    try:
        await bookings_collection.insert_one(doc)
    except Exception as e:
        logger.exception("Failed to insert booking")
        raise HTTPException(status_code=500, detail="Could not save booking") from e

    logger.info("New booking %s for %s (%s)", booking.id, booking.name, booking.service)
    return booking


@api_router.get("/bookings", response_model=List[Booking])
async def list_bookings():
    cursor = bookings_collection.find({}, {"_id": 0}).sort("created_at", -1)
    return [Booking(**doc) async for doc in cursor]


app.include_router(api_router)

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    try:
        await bookings_collection.create_index("created_at")
        await bookings_collection.create_index("email")
        logger.info("Mongo indexes ensured on bookings collection")
    except Exception:
        logger.exception("Failed to create indexes")


@app.on_event("shutdown")
async def on_shutdown():
    client.close()
    logger.info("Mongo client closed")
