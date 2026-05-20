import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API_BASE = `${BACKEND_URL}/api`;

const FALLBACK_SERVICES = [
  { id: "computer-repair", name: "Computer Repair" },
  { id: "network-setup", name: "Network Setup" },
  { id: "virus-removal", name: "Virus Removal" },
  { id: "data-recovery", name: "Data Recovery" },
  { id: "cloud-setup", name: "Cloud Setup" },
  { id: "software-installation", name: "Software Installation" },
];

export default function Contact() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/services`, { timeout: 4000 });
        if (!cancelled && Array.isArray(res.data) && res.data.length) {
          setServices(res.data);
        }
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Please enter a valid email.";
    if (form.phone.replace(/\D/g, "").length < 7)
      return "Please enter a valid phone number.";
    if (!form.service) return "Please choose a service.";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE}/bookings`, form);
      toast.success("Request received. We'll be in touch shortly.");
      setSubmitted(true);
    } catch (e) {
      const msg =
        e?.response?.data?.detail ||
        "We couldn't submit your request. Please try again or call us.";
      toast.error(typeof msg === "string" ? msg : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="bg-ink text-white"
      data-testid="contact-section"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-brand flex items-center gap-3 mb-6">
            <span className="inline-block w-8 h-px bg-brand" />
            Book Support
          </div>
          <h2 className="font-display font-extrabold uppercase tracking-tighter text-4xl md:text-6xl leading-[0.95]">
            Tell Us What's <span className="text-brand">Broken.</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
            Fill this out and we'll respond within two business hours. For
            emergencies, call <span className="text-white">(555) 123-4567</span>.
          </p>
        </div>

        {submitted ? (
          <div
            className="border border-white/15 p-10 md:p-16 flex flex-col items-start"
            data-testid="contact-success"
          >
            <CheckCircle2 size={48} strokeWidth={1.5} className="text-brand mb-6" />
            <h3 className="font-display font-extrabold uppercase tracking-tighter text-3xl md:text-4xl mb-3">
              Request Received
            </h3>
            <p className="text-white/60 max-w-md mb-8 leading-relaxed">
              Thanks — we've logged your request and one of our techs will be in
              touch shortly. Check your inbox for confirmation.
            </p>
            <Button
              onClick={reset}
              variant="secondary"
              className="border-white/40 text-white hover:bg-white hover:text-ink"
              data-testid="submit-another-button"
            >
              Submit Another Request
            </Button>
          </div>
        ) : (
          <div
            className="grid md:grid-cols-2 gap-6"
            data-testid="contact-form"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Jane Doe"
                data-testid="input-name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="jane@example.com"
                data-testid="input-email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="(555) 123-4567"
                data-testid="input-phone"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="service">Service *</Label>
              <Select
                value={form.service}
                onValueChange={(v) => update("service", v)}
              >
                <SelectTrigger id="service" data-testid="select-service">
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem
                      key={s.id}
                      value={s.name}
                      data-testid={`service-option-${s.id}`}
                    >
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell us what's going on..."
                data-testid="input-message"
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                size="lg"
                className="w-full"
                data-testid="submit-button"
              >
                {submitting ? "Submitting..." : "Submit Request"}
                <Send size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
