"use client";

import type { Icon } from "@phosphor-icons/react";
import { ArrowRight, GithubLogo, LinkedinLogo, TwitterLogo } from "@phosphor-icons/react/ssr";
import { useTheme } from "../../providers/useTheme";
import BrandWordmark from "../ui/BrandWordmark";
import SectionHeader from "../ui/SectionHeader";

const FORM_LABEL_CLASS_NAME =
  "text-xs font-semibold font-mono-accent text-muted-foreground uppercase tracking-wider";

const FORM_CONTROL_CLASS_NAME =
  "w-full bg-background border border-border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all hover:border-foreground/30 shadow-sm";

const SOCIAL_LINKS: Array<{ href: string; label: string; Icon: Icon }> = [
  { href: "#", label: "GitHub", Icon: GithubLogo },
  { href: "#", label: "Twitter", Icon: TwitterLogo },
  { href: "#", label: "LinkedIn", Icon: LinkedinLogo }
];

type FormFieldProps = {
  id: string;
  label: string;
  type: "text" | "email";
  placeholder: string;
};

function FormField({ id, label, type, placeholder }: FormFieldProps) {
  return (
    <div className="space-y-3">
      <label htmlFor={id} className={FORM_LABEL_CLASS_NAME}>
        {label}
      </label>
      <input id={id} type={type} placeholder={placeholder} className={FORM_CONTROL_CLASS_NAME} />
    </div>
  );
}

function ContactForm() {
  return (
    <form className="w-full rounded-3xl border border-border/80 bg-card/50 p-8 text-left shadow-2xl shadow-primary/5 backdrop-blur-xl md:p-12">
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField id="name" label="Name" type="text" placeholder="John Doe" />
        <FormField id="email" label="Email" type="email" placeholder="john@example.com" />
      </div>

      <div className="mb-8 space-y-3">
        <label htmlFor="message" className={FORM_LABEL_CLASS_NAME}>
          Project Details
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your requirements, timeline, and goals..."
          className={`${FORM_CONTROL_CLASS_NAME} resize-none`}
        ></textarea>
      </div>

      <button
        type="button"
        className="group ml-auto flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:opacity-90 md:w-auto"
      >
        Send Message
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-border border-t bg-background px-6 pt-24 pb-12 text-foreground"
    >
      {/* Abstract Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-1/2 w-full max-w-3xl -translate-x-1/2 rounded-full bg-border/50 opacity-50 blur-[120px]"></div>

      <div className="relative z-10 mx-auto mb-24 flex max-w-4xl flex-col items-center text-center">
        <SectionHeader
          align="center"
          title="Let's build it right."
          titleClassName="mb-6 text-4xl md:text-6xl tracking-tighter"
          description="Bring us your hardest technical challenges and your highest design expectations. We're ready."
          descriptionClassName="mb-8 max-w-xl text-lg"
        />

        <a
          href="mailto:hello@webcrafts.dev"
          className="border-primary border-b pb-1 font-medium text-xl transition-colors hover:text-muted-foreground md:text-3xl"
        >
          hello@webcrafts.dev
        </a>

        {/* Separator */}
        <div className="mx-auto my-12 flex w-full max-w-lg items-center">
          <div className="h-px flex-1 bg-border"></div>
          <span className="px-6 font-mono-accent text-muted-foreground text-sm tracking-widest">
            OR
          </span>
          <div className="h-px flex-1 bg-border"></div>
        </div>

        <ContactForm />
      </div>

      <div className="section-container relative z-10 flex flex-col items-center justify-between gap-6 border-border border-t pt-8 text-muted-foreground text-sm md:flex-row">
        <div className="flex items-center gap-2">
          <img src={`/logo-${isDark ? "dark" : "light"}.svg`} className="h-6 w-6" alt="logo" />
          <BrandWordmark className="text-lg" />
          <span className="flex items-center font-KodeMono leading-none tracking-tight">
            &copy; {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex gap-6 [&>a]:flex [&>a]:items-center [&>a]:gap-2 [&>a]:transition-colors [&>a]:hover:text-foreground">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a key={label} href={href}>
              <Icon className="h-4 w-4" /> {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
