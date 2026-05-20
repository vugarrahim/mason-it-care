import React from "react";
import { Toaster } from "sonner";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "0px",
            border: "1px solid #0A0A0A",
            background: "#FFFFFF",
            color: "#0A0A0A",
            fontFamily: "IBM Plex Mono, ui-monospace, monospace",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
          },
        }}
      />
    </div>
  );
}
