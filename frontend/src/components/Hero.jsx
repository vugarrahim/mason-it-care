import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const scrollTo = (e, href) => {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Hero() {
  return (
    <section
      id="top"
      className="border-b border-line"
      data-testid="hero-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <div
              className="label-mono opacity-0 animate-fade-up stagger-1 flex items-center gap-3 mb-8"
              data-testid="hero-eyebrow"
            >
              <span className="inline-block w-8 h-px bg-brand" />
              Local IT Support — Mason IT Care
            </div>

            <h1
              className="font-display font-extrabold uppercase tracking-tighter leading-[0.95] text-5xl md:text-7xl lg:text-[5.5rem] opacity-0 animate-fade-up stagger-2"
              data-testid="hero-title"
            >
              IT Support
              <br />
              That Just
              <br />
              <span className="text-brand">Works.</span>
            </h1>

            <p
              className="mt-8 text-base md:text-lg text-muted max-w-xl leading-relaxed opacity-0 animate-fade-up stagger-3"
              data-testid="hero-subtitle"
            >
              From flickering networks to ransomware lockouts — Mason IT Care
              keeps homes and small businesses online, secure, and moving.
              Fast response. Honest pricing. No technobabble.
            </p>

            <div
              className="mt-10 flex flex-wrap gap-4 opacity-0 animate-fade-up stagger-4"
              data-testid="hero-cta-row"
            >
              <Button
                size="lg"
                onClick={(e) => scrollTo(e, "#contact")}
                data-testid="hero-cta-primary"
              >
                Get Support Now
                <ArrowRight size={16} />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={(e) => scrollTo(e, "#services")}
                data-testid="hero-cta-secondary"
              >
                Our Services
              </Button>
            </div>
          </div>

          {/* Right */}
          <div
            className="relative opacity-0 animate-fade-up stagger-3"
            data-testid="hero-image-wrap"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-ink" />
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Server room with networking equipment"
                className="w-full h-[420px] md:h-[520px] object-cover"
                data-testid="hero-image"
              />
              <div className="absolute inset-0 bg-brand/10 mix-blend-multiply pointer-events-none" />
            </div>
            <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
