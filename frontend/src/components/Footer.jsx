import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const SERVICES = [
  "Computer Repair",
  "Network Setup",
  "Virus Removal",
  "Data Recovery",
  "Cloud Setup",
  "Software Installation",
];

const HOURS = [
  ["Mon – Fri", "8AM – 8PM"],
  ["Saturday", "9AM – 5PM"],
  ["Sunday", "Emergency Only"],
];

const scrollTo = (e, href) => {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Footer() {
  return (
    <footer
      className="bg-ink text-white relative overflow-hidden"
      data-testid="site-footer"
    >
      {/* Massive faded background text */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 font-display font-extrabold uppercase tracking-tighter text-white/5 text-[18vw] leading-none pointer-events-none select-none whitespace-nowrap"
      >
        MASON IT CARE
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {/* Contact */}
          <div>
            <div className="label-mono !text-white/40 mb-6">Contact</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-brand mt-0.5 shrink-0" />
                <a
                  href="mailto:hello@masonitcare.com"
                  className="hover:text-brand transition-colors"
                  data-testid="footer-email"
                >
                  hello@masonitcare.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-brand mt-0.5 shrink-0" />
                <a
                  href="tel:+15551234567"
                  className="hover:text-brand transition-colors"
                  data-testid="footer-phone"
                >
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand mt-0.5 shrink-0" />
                <span data-testid="footer-address">123 Tech Lane, Mason City</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="label-mono !text-white/40 mb-6">Services</div>
            <ul className="space-y-3 text-sm">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    onClick={(e) => scrollTo(e, "#services")}
                    className="hover:text-brand transition-colors"
                    data-testid={`footer-service-${s.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours + CTA */}
          <div>
            <div className="label-mono !text-white/40 mb-6">Hours</div>
            <ul className="space-y-3 text-sm mb-8">
              {HOURS.map(([day, hours]) => (
                <li key={day} className="flex justify-between gap-6 max-w-xs">
                  <span className="text-white/70">{day}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] border border-white px-5 py-3 hover:bg-brand hover:border-brand transition-all duration-150"
              data-testid="footer-book-support"
            >
              Book Support →
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <span className="text-white/40 font-mono uppercase tracking-[0.14em]">
            © {new Date().getFullYear()} Mason IT Care. All rights reserved.
          </span>
          <span className="text-white/40 font-mono uppercase tracking-[0.14em]">
            IT Support That Just Works.
          </span>
        </div>
      </div>
    </footer>
  );
}
