import React from "react";

const METRICS = [
  { value: "99.9%", label: "Uptime Guarantee", testid: "metric-uptime" },
  { value: "24/7", label: "Support Available", testid: "metric-support" },
  { value: "500+", label: "Clients Served", testid: "metric-clients" },
  { value: "<2hr", label: "Avg Response Time", testid: "metric-response" },
];

export default function About() {
  return (
    <section
      id="about"
      className="border-b border-line bg-bg"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-ink" />
            <img
              src="https://images.pexels.com/photos/12741843/pexels-photo-12741843.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="IT technician working on network equipment"
              className="relative w-full h-[420px] md:h-[520px] object-cover"
              data-testid="about-image"
            />
            <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-brand" />
          </div>

          {/* Text + Metrics */}
          <div>
            <div className="label-mono flex items-center gap-3 mb-6">
              <span className="inline-block w-8 h-px bg-brand" />
              About Us
            </div>
            <h2 className="font-display font-extrabold uppercase tracking-tighter text-4xl md:text-5xl leading-[0.95] mb-6">
              A Support Partner, Not Just a <span className="text-brand">Vendor.</span>
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed mb-12 max-w-xl">
              We've been keeping local homes and businesses online for over a
              decade. We answer the phone. We show up on time. We tell you what
              we're doing in plain English. That's the whole pitch.
            </p>

            <div className="grid grid-cols-2 border-l border-t border-line">
              {METRICS.map((m) => (
                <div
                  key={m.label}
                  className="p-6 md:p-8 border-r border-b border-line bg-white"
                  data-testid={m.testid}
                >
                  <div className="font-display font-extrabold tracking-tighter text-4xl md:text-5xl text-brand">
                    {m.value}
                  </div>
                  <div className="label-mono mt-2">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
