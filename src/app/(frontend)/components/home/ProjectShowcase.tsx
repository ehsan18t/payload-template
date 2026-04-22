import { ArrowUpRight, Lightning } from "@phosphor-icons/react/ssr";
import { PROJECTS, type Project } from "../../data/constants";
import SectionHeader from "../ui/SectionHeader";
import WindowControls from "../ui/WindowControls";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col items-center gap-8 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-foreground/20 md:flex-row">
      {/* Mock Visual representation of project */}
      <div className="relative flex aspect-video w-full flex-col overflow-hidden rounded-xl border border-border/50 bg-muted md:w-1/2">
        <div className="flex h-8 items-center gap-2 border-border/50 border-b bg-background/50 px-4">
          <WindowControls
            dotBaseClassName="w-2.5 h-2.5 rounded-full"
            dotClassNames={["bg-border", "bg-border", "bg-border"]}
          />
        </div>
        <div className="relative flex-1 overflow-hidden p-6">
          <div className="absolute -right-4 -bottom-4 flex h-3/4 w-3/4 rounded-tl-xl border border-border bg-background p-4 shadow-xl">
            <div className="w-1/3 space-y-2 border-border/50 border-r pr-4 [&>div]:h-2 [&>div]:rounded [&>div]:bg-border">
              <div className="w-full"></div>
              <div className="w-3/4"></div>
              <div className="w-5/6"></div>
            </div>
            <div className="w-2/3 space-y-4 pl-4 [&>div]:bg-muted">
              <div className="h-16 rounded-lg"></div>
              <div className="h-4 w-1/2 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 md:w-1/2 md:p-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/50 bg-muted px-3 py-1 font-mono-accent text-muted-foreground text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-4 flex items-center gap-3 font-bold text-2xl text-foreground md:text-3xl">
          {project.title}
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
        </h3>
        <p className="mb-8 text-muted-foreground leading-relaxed">{project.desc}</p>
        <div className="inline-flex items-center gap-2 rounded-md bg-success px-4 py-2 font-medium text-sm text-success-foreground">
          <Lightning className="h-4 w-4" />
          {project.metric}
        </div>
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  return (
    <section id="work" className="section-padding border-border border-t bg-background">
      <div className="section-container">
        <div className="mb-16">
          <SectionHeader
            kicker="Selected Work"
            title="Proof of Work"
            titleClassName="mb-4"
            description="We partner with ambitious companies to build scalable, mission-critical software. Here are a few recent highlights."
            descriptionClassName="max-w-lg"
          />
        </div>

        <div className="flex flex-col gap-12">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
