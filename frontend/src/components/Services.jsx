import React from "react";
import {
  Wrench,
  Wifi,
  ShieldAlert,
  HardDrive,
  Cloud,
  Download,
} from "lucide-react";

const SERVICES = [
  {
    icon: Wrench,
    title: "Computer Repair",
    description:
      "Diagnostics, hardware replacement, performance tune-ups. Desktops, laptops, and everything in between.",
    span: "md:col-span-2",
    testid: "service-computer-repair",
  },
  {
    icon: Wifi,
    title: "Network Setup",
    description:
      "WiFi installation, mesh systems, and small business network configuration that holds up under load.",
    span: "",
    testid: "service-network-setup",
  },
  {
    icon: ShieldAlert,
    title: "Virus Removal",
    description:
      "Malware cleanup, ransomware response, endpoint hardening. We get you clean and keep you clean.",
    span: "",
    testid: "service-virus-removal",
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    description:
      "File and drive recovery from failed disks, accidental deletion, and corruption.",
    span: "",
    testid: "service-data-recovery",
  },
  {
    icon: Cloud,
    title: "Cloud Setup",
    description:
      "Microsoft 365, Google Workspace, and cloud backup migrations done right the first time.",
    span: "",
    testid: "service-cloud-setup",
  },
  {
    icon: Download,
    title: "Software Installation",
    description:
      "Licensed software setup, updates, and ongoing patch management so nothing slips through.",
    span: "md:col-span-2",
    testid: "service-software-installation",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="border-b border-line"
      data-testid="services-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <div className="label-mono flex items-center gap-3 mb-6">
            <span className="inline-block w-8 h-px bg-brand" />
            What We Do
          </div>
          <h2 className="font-display font-extrabold uppercase tracking-tighter text-4xl md:text-6xl leading-[0.95]">
            Our <span className="text-brand">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 border-l border-t border-line">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`group p-8 md:p-10 border-r border-b border-line bg-white transition-all duration-150 ease-out hover:shadow-[4px_4px_0px_#FF4F00] hover:-translate-y-1 cursor-default ${s.span}`}
                data-testid={s.testid}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 border border-ink mb-8 group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-colors duration-150">
                  <Icon size={24} strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-extrabold uppercase tracking-tighter text-2xl md:text-3xl mb-3">
                  {s.title}
                </h3>
                <p className="text-muted text-sm md:text-base leading-relaxed max-w-md">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
