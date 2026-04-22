type BrandWordmarkProps = {
  className?: string;
  textClassName?: string;
};

export default function BrandWordmark({
  className = "",
  textClassName = "text-foreground/80"
}: BrandWordmarkProps) {
  const wrapperClassName = [
    "font-KodeMono flex items-center tracking-tight leading-none",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName}>
      <span className={textClassName}>WebCrafts</span>
      <span className="text-logo-dot">.</span>
      <span className={textClassName}>dev</span>
    </div>
  );
}
