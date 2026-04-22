import { Quotes } from "@phosphor-icons/react/ssr";
import { TESTIMONIALS, type Testimonial } from "../../data/constants";
import SectionHeader from "../ui/SectionHeader";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-muted p-8">
      <div>
        <Quotes className="mb-6 h-8 w-8 text-border" />
        <p className="mb-8 text-foreground text-lg leading-relaxed">"{testimonial.quote}"</p>
      </div>
      <div className="flex items-center gap-4 border-border/50 border-t pt-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-border font-bold text-muted-foreground text-sm">
          {testimonial.initials}
        </div>
        <div>
          <div className="font-bold text-foreground text-sm">{testimonial.author}</div>
          <div className="font-mono-accent text-muted-foreground text-xs">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <SectionHeader
          align="center"
          title="Don't just take our word for it."
          titleClassName="mb-4"
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
