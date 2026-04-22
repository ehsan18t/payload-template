type WindowControlsProps = {
  className?: string;
  dotClassNames?: string[];
  dotBaseClassName?: string;
  count?: number;
};

export default function WindowControls({
  className = "flex gap-2",
  dotClassNames,
  dotBaseClassName,
  count = 3
}: WindowControlsProps) {
  const classes = dotClassNames ?? Array.from({ length: count }, () => "");

  const baseClassName =
    dotBaseClassName ?? (dotClassNames ? "w-3 h-3 rounded-full" : "window-control-dot");

  return (
    <div className={className}>
      {classes.map((dotClassName, idx) => (
        <div key={idx} className={[baseClassName, dotClassName].filter(Boolean).join(" ")}></div>
      ))}
    </div>
  );
}
