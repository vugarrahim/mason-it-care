import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-black/5"
      data-testid="site-header"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => scrollTo(e, "#top")}
          className="font-display font-extrabold text-xl md:text-2xl tracking-tighter"
          data-testid="logo-link"
        >
          Mason <span className="text-brand">IT</span> Care
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-ink hover:text-brand transition-colors duration-150"
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            onClick={(e) => scrollTo(e, "#contact")}
            data-testid="book-support-cta-header"
          >
            Book Support
          </Button>
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          data-testid="mobile-menu-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t border-black/5 bg-white"
          data-testid="mobile-menu"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="font-mono text-xs uppercase tracking-[0.18em] text-ink"
                data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={(e) => scrollTo(e, "#contact")}
              className="w-full"
              data-testid="book-support-cta-mobile"
            >
              Book Support
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
