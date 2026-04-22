import type { Icon } from "@phosphor-icons/react";
import {
  ArrowRight,
  DeviceMobile,
  HardDrives,
  Layout,
  Network,
  Sparkle,
  Terminal
} from "@phosphor-icons/react/ssr";
import { EXPERTISE, type ExpertiseIconKey, type ExpertiseItem } from "../../data/constants";
import SectionHeader from "../ui/SectionHeader";

const expertiseIcons: Record<ExpertiseIconKey, Icon> = {
  network: Network,
  "layout-dashboard": Layout,
  terminal: Terminal,
  smartphone: DeviceMobile,
  "server-crash": HardDrives
};

function ExpertiseCard({ item }: { item: ExpertiseItem }) {
  const Icon = expertiseIcons[item.icon];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-primary/10 hover:shadow-xl md:p-8 ${item.featured ? "md:col-span-2 lg:col-span-2" : ""}`}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-border/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

      {/* Thematic Watermark Icon */}
      <div className="pointer-events-none absolute -right-4 -bottom-4 translate-x-4 translate-y-4 transform opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
        <Icon className="h-32 w-32 text-border/50" strokeWidth={1} />
      </div>

      <div className="relative z-10 mb-10 flex items-start justify-between">
        <div className="rounded-xl border border-border bg-background p-3 text-foreground shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <span className="font-mono-accent font-semibold text-muted-foreground text-xs">
          {item.id}
        </span>
      </div>

      <div className="relative z-10 mt-auto">
        <h3 className="mb-3 font-bold text-foreground text-xl md:text-2xl">{item.title}</h3>
        <p className="mb-6 max-w-2xl text-muted-foreground text-sm leading-relaxed md:text-base">
          {item.desc}
        </p>

        {/* Slide-up CTA */}
        <div className="flex translate-y-2 transform items-center font-semibold text-foreground text-xs opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Explore capabilities{" "}
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="section-padding relative overflow-hidden border-border border-t bg-background"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-1/2 w-full max-w-3xl -translate-x-1/2 rounded-full bg-muted/50 opacity-50 blur-[100px]"></div>

      <div className="section-container relative z-10">
        <div className="mb-12">
          <SectionHeader
            title="Domain Expertise"
            titleClassName="md:text-4xl lg:text-5xl mb-4"
            description="We operate at the intersection of pixel-perfect design and uncompromised engineering. Delivering robust solutions across the entire digital spectrum."
            descriptionClassName="max-w-2xl text-base md:text-lg leading-relaxed"
            kicker={
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 font-medium font-mono-accent text-muted-foreground text-xs shadow-sm">
                <Sparkle className="h-3.5 w-3.5" />
                <span>Core Capabilities</span>
              </span>
            }
            kickerClassName="mb-6"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {EXPERTISE.map((item) => (
            <ExpertiseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
