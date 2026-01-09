import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  aspectRatio?: string;
}

export function Skeleton({
  className,
  width,
  height,
  rounded = "md",
  aspectRatio,
}: SkeletonProps) {
  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const style: React.CSSProperties = {};
  if (width) {
    style.width = typeof width === "number" ? `${width}px` : width;
  }
  if (height) {
    style.height = typeof height === "number" ? `${height}px` : height;
  }

  const aspectRatioClass = aspectRatio
    ? aspectRatio.includes("/")
      ? `aspect-[${aspectRatio}]`
      : `aspect-${aspectRatio}`
    : "";

  return (
    <div
      className={cn(
        "animate-pulse bg-slate-700",
        roundedClasses[rounded],
        aspectRatioClass,
        className,
      )}
      style={style}
    />
  );
}
