import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  description?: string;
  kicker?: ReactNode;
  kickerClassName?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export default function SectionHeader({
  title,
  description,
  kicker,
  kickerClassName = "section-kicker",
  align = "left",
  className = "",
  titleClassName = "",
  descriptionClassName = ""
}: SectionHeaderProps) {
  const isCentered = align === "center";

  const wrapperClassName = [isCentered ? "text-center" : "", className].filter(Boolean).join(" ");

  const titleClasses = ["section-title", titleClassName].filter(Boolean).join(" ");

  const descriptionClasses = [
    "text-muted-foreground",
    isCentered ? "mx-auto" : "",
    descriptionClassName
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName}>
      {kicker && <div className={kickerClassName}>{kicker}</div>}
      <h2 className={titleClasses}>{title}</h2>
      {description && <p className={descriptionClasses}>{description}</p>}
    </div>
  );
}
