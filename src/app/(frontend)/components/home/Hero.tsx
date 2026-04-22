import type { Icon } from "@phosphor-icons/react";
import {
  ArrowRight,
  HardDrives,
  Layout,
  Stack,
  Star,
  Terminal,
  User
} from "@phosphor-icons/react/ssr";
import WindowControls from "../ui/WindowControls";

const AVATAR_BG_CLASSES = [
  "bg-indigo-100 dark:bg-indigo-900/50",
  "bg-rose-100 dark:bg-rose-900/50",
  "bg-emerald-100 dark:bg-emerald-900/50",
  "bg-amber-100 dark:bg-amber-900/50"
];

const BROWSER_DOT_COLORS = ["bg-rose-400/80", "bg-amber-400/80", "bg-emerald-400/80"];

const MOCKUP_CARDS: Array<{
  Icon: Icon;
  toneClass: string;
  lineAWidth: string;
  lineBWidth: string;
}> = [
  {
    Icon: Layout,
    toneClass: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400",
    lineAWidth: "w-3/4",
    lineBWidth: "w-1/2"
  },
  {
    Icon: HardDrives,
    toneClass: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    lineAWidth: "w-full",
    lineBWidth: "w-2/3"
  }
];

function HeroActions() {
  return (
    <div className="mb-12 flex w-full flex-col items-center gap-4 sm:flex-row [&>button]:w-full [&>button]:rounded-md [&>button]:px-6 [&>button]:py-3 [&>button]:font-medium sm:[&>button]:w-auto">
      <button className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground transition-all hover:opacity-90">
        Start your project
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
      <button className="border border-border bg-transparent text-foreground transition-all hover:bg-muted">
        Review our stack
      </button>
    </div>
  );
}

function TrustSignals() {
  return (
    <div className="flex w-full flex-col items-center gap-4 border-border border-t pt-8 sm:w-auto sm:flex-row">
      <div className="flex -space-x-3 [&>div]:relative [&>div]:z-10">
        {AVATAR_BG_CLASSES.map((bgClass) => (
          <div
            key={bgClass}
            className={`h-10 w-10 rounded-full border-2 border-background ${bgClass} flex items-center justify-center shadow-sm [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-muted-foreground`}
          >
            <User />
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-col items-center sm:mt-0 sm:items-start">
        <div className="flex items-center gap-1 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:fill-foreground [&>svg]:text-foreground">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Star key={rating} />
          ))}
        </div>
        <span className="mt-1 font-medium text-muted-foreground text-sm">
          Trusted by 20+ fast-growing teams
        </span>
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="perspective-1000 relative hidden h-125 w-full lg:block">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Background Plate / Glow */}
        <div className="absolute h-[80%] w-[80%] rotate-6 scale-105 transform rounded-3xl border border-border/50 bg-border/30 backdrop-blur-sm"></div>

        {/* Main Mockup Container */}
        <div className="relative z-10 flex h-[85%] w-[85%] -rotate-2 transform flex-col overflow-hidden rounded-2xl border border-border bg-card/90 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:rotate-0">
          {/* Browser/App Header */}
          <div className="flex h-12 items-center gap-2 border-border border-b bg-muted px-4">
            <WindowControls dotClassNames={BROWSER_DOT_COLORS} />
            <div className="ml-4 flex h-4 w-32 items-center rounded bg-border px-2 font-mono-accent text-[10px] text-muted-foreground">
              webcrafts.dev/app
            </div>
          </div>

          {/* Mockup Body */}
          <div className="relative grid flex-1 grid-cols-2 gap-4 bg-muted/30 p-6">
            {/* Skeleton Blocks representing UI */}
            {MOCKUP_CARDS.map(({ Icon, toneClass, lineAWidth, lineBWidth }) => (
              <div
                key={toneClass}
                className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 shadow-sm"
              >
                <div className={`h-8 w-8 rounded-lg ${toneClass} flex items-center justify-center`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className={`h-2 ${lineAWidth} rounded bg-border`}></div>
                <div className={`h-2 ${lineBWidth} rounded bg-muted`}></div>
              </div>
            ))}

            <div className="relative col-span-2 flex items-center gap-4 overflow-hidden rounded-xl bg-mockup-terminal p-5">
              <div className="absolute top-0 right-0 bottom-0 z-10 w-32 bg-linear-to-l from-mockup-terminal to-transparent"></div>
              <Terminal className="h-6 w-6 shrink-0 text-zinc-400" />
              <div className="overflow-hidden whitespace-nowrap font-mono-accent text-xs text-zinc-300">
                <span className="text-purple-400">cargo</span> build --release
                <br />
                <span className="text-emerald-400">Compiling</span> webcrafts-core v1.0.0
              </div>
            </div>
          </div>
        </div>

        {/* Floating Notification Element */}
        <div
          className="absolute top-1/4 -right-6 z-20 flex animate-bounce items-center gap-3 rounded-xl border border-border bg-background p-3 shadow-xl"
          style={{ animationDuration: "3s" }}
        >
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-xs">Deployment Successful</span>
            <span className="font-mono-accent text-[10px] text-muted-foreground">0ms downtime</span>
          </div>
        </div>

        {/* Floating Tech Element */}
        <div className="absolute bottom-1/4 -left-8 z-20 flex h-12 w-12 -rotate-12 transform items-center justify-center rounded-xl border border-border bg-background p-3 shadow-xl transition-transform hover:rotate-0">
          <Stack className="h-6 w-6 text-indigo-500" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-20 md:pt-48 md:pb-32">
      <div className="mask-[linear-gradient(to_bottom,white,transparent)] dark:mask-[linear-gradient(to_bottom,black,transparent)] pointer-events-none absolute inset-0 z-0 bg-grid-pattern"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Column: Typography & CTA */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 font-medium font-mono-accent text-xs backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
              Accepting select projects for Q4
            </div>

            <h1 className="mb-6 max-w-2xl text-center font-bold text-5xl text-foreground leading-none tracking-tighter md:text-start md:text-6xl lg:text-[5rem]">
              We craft digital solutions <br className="hidden md:block" />
              <span className="text-muted-foreground">that make an impact.</span>
            </h1>

            <p className="mb-10 max-w-lg text-center text-lg text-muted-foreground leading-relaxed md:text-justify">
              An elite engineering agency specializing in complex system architecture,
              high-performance web platforms, and native applications. We leverage microservices,
              advanced caching, and job offloading to build robust digital products that scale
              effortlessly.
            </p>

            <HeroActions />
            <TrustSignals />
          </div>

          {/* Right Column: Abstract UI/Architecture Composition */}
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
