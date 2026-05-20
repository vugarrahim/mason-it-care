import React from "react";

const ITEMS = [
  "System Diagnostics",
  "Network Optimization",
  "Hardware Repair",
  "Zero Downtime",
  "24/7 Support",
  "Cloud Migration",
  "Data Protection",
  "Virus Removal",
];

function Row() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-8 shrink-0">
          <span className="font-mono uppercase tracking-[0.2em] text-brand text-sm md:text-base">
            {item}
          </span>
          <span
            className="inline-block w-2 h-2 bg-brand rotate-45 shrink-0"
            aria-hidden="true"
          />
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <section
      className="bg-ink py-6 md:py-7 overflow-hidden border-y border-ink"
      data-testid="marquee-section"
      aria-label="Services ticker"
    >
      <div className="marquee-track animate-marquee gap-8">
        <div className="flex items-center gap-8 pr-8">
          <Row />
        </div>
        <div className="flex items-center gap-8 pr-8" aria-hidden="true">
          <Row />
        </div>
      </div>
    </section>
  );
}
