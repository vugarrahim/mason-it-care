import React from "react";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Our office network went down on a Monday morning. Mason IT had us back up before lunch. They explained what went wrong and how to prevent it. That's rare.",
    name: "Sarah Mitchell",
    role: "Operations Manager",
    avatar:
      "https://images.unsplash.com/photo-1778692258270-bc0e80e975c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxzbWlsaW5nJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NzkyNzk5ODZ8MA&ixlib=rb-4.1.0&q=85",
    testid: "testimonial-1",
  },
  {
    quote:
      "I thought my hard drive was a goner — five years of photos. They recovered every single file. Honest pricing, no upsell, just results.",
    name: "David Reyes",
    role: "Homeowner",
    avatar: null,
    initials: "DR",
    testid: "testimonial-2",
  },
  {
    quote:
      "We migrated our small business to Microsoft 365 with them. Zero disruption. They even trained our staff. Couldn't recommend more highly.",
    name: "Janet Park",
    role: "Owner, Park & Co.",
    avatar: null,
    initials: "JP",
    testid: "testimonial-3",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-b border-line"
      data-testid="testimonials-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <div className="label-mono flex items-center gap-3 mb-6">
            <span className="inline-block w-8 h-px bg-brand" />
            What Clients Say
          </div>
          <h2 className="font-display font-extrabold uppercase tracking-tighter text-4xl md:text-6xl leading-[0.95]">
            Real People. <span className="text-brand">Real Results.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border-l border-t border-line">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="p-8 md:p-10 border-r border-b border-line bg-white flex flex-col"
              data-testid={t.testid}
            >
              <Quote
                size={32}
                strokeWidth={1.5}
                className="text-brand rotate-180 mb-6"
              />
              <p className="text-ink text-base md:text-lg leading-relaxed flex-1 mb-8">
                {t.quote}
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-line">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-ink text-white font-mono text-sm flex items-center justify-center">
                    {t.initials}
                  </div>
                )}
                <div>
                  <div className="font-display font-extrabold uppercase tracking-tight text-base">
                    {t.name}
                  </div>
                  <div className="label-mono mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
