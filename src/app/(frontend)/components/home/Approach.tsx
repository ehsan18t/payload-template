import { Fingerprint, Lightning } from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import SectionHeader from "../ui/SectionHeader";
import WindowControls from "../ui/WindowControls";

const APPROACH_POINTS: Array<{
  title: string;
  description: string;
  Icon: Icon;
}> = [
  {
    title: "Uncompromising UI/UX",
    description:
      "Design isn't just how it looks; it's how it feels. We meticulously craft interfaces that build trust and drive user retention.",
    Icon: Fingerprint,
  },
  {
    title: "Performant by Default",
    description:
      "Whether it's a Rust backend or a React frontend, we write lean, optimized code that respects your users' time and bandwidth.",
    Icon: Lightning,
  },
];

export default function Approach() {
  return (
    <section
      id="approach"
      className="section-padding border-t border-border bg-background"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Typography / Copy side */}
          <div>
            <SectionHeader
              title="Engineered for humans. Built for scale."
              titleClassName="mb-6"
              kicker="Our Approach"
            />

            <div className="space-y-8 mt-12 [&>div]:flex [&>div]:gap-4 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-foreground [&_p]:text-muted-foreground">
              {APPROACH_POINTS.map(({ title, description, Icon }) => (
                <div key={title}>
                  <Icon className="w-6 h-6 text-muted-foreground shrink-0 mt-1" />
                  <div>
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mock Code Editor / Terminal side - Replaces the generic floating UI */}
          <div className="rounded-xl overflow-hidden border border-border bg-card shadow-2xl">
            {/* Window Controls */}
            <div className="flex items-center px-4 py-3 border-b border-border/80 bg-card">
              <WindowControls />
              <div className="mx-auto font-mono-accent text-xs text-muted-foreground">
                src/main.rs
              </div>
            </div>
            {/* Code Content */}
            <div className="p-6 overflow-x-auto text-sm font-mono-accent leading-relaxed bg-mockup-code">
              <pre className="text-foreground">
                <code>
                  <span className="text-muted-foreground">
                    // Initialize high-performance core
                  </span>
                  {"\n"}
                  <span className="text-purple-600 dark:text-purple-400">
                    fn
                  </span>{" "}
                  <span className="text-blue-600 dark:text-blue-400">main</span>
                  () {"{\n"}
                  {"    "}
                  <span className="text-purple-600 dark:text-purple-400">
                    let
                  </span>{" "}
                  app = webcrafts::App::new(){"\n"}
                  {"        .with_ui_framework(Framework::React)\n"}
                  {"        .with_backend(Runtime::Rust)\n"}
                  {"        .optimize_for(Metrics::Performance);\n\n"}
                  {"    "}
                  <span className="text-muted-foreground">
                    // We handle the complexity.
                  </span>
                  {"\n"}
                  {"    "}
                  <span className="text-muted-foreground">
                    // You get the results.
                  </span>
                  {"\n"}
                  {"    "}
                  <span className="text-purple-600 dark:text-purple-400">
                    match
                  </span>{" "}
                  app.build() {"{\n"}
                  {"        Ok(solution) => solution.deploy(),\n"}
                  {"        Err(e) => "}
                  <span className="text-red-600 dark:text-red-400">panic!</span>
                  (
                  <span className="text-green-600 dark:text-green-400">
                    "Quality standards not met: {}"
                  </span>
                  , e),{"\n"}
                  {"    }\n"}
                  {"}"}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
