import { TECHNOLOGIES } from "../../data/constants";

const TICKER_TECHNOLOGIES = [...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES];

export default function TechTicker() {
  return (
    <section className="relative overflow-hidden border-border border-y bg-muted/50 py-6">
      <div className="absolute top-0 bottom-0 left-0 z-10 w-24 bg-linear-to-r from-muted to-transparent"></div>
      <div className="absolute top-0 right-0 bottom-0 z-10 w-24 bg-linear-to-l from-muted to-transparent"></div>

      <div className="flex w-fit animate-marquee font-mono-accent text-muted-foreground text-sm uppercase tracking-wider [&>div]:flex [&>div]:items-center">
        {TICKER_TECHNOLOGIES.map((tech, index) => (
          <div key={`${tech}-${index}`}>
            <span className="mx-6">{tech}</span>
            <span className="text-muted-foreground/30">/</span>
          </div>
        ))}
      </div>
    </section>
  );
}
