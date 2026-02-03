import { Skeleton } from "@/app/_components/Skeleton";

export function SetGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton
          key={i}
          height={160}
          rounded="xl"
          className="bg-gradient-to-br from-slate-700 to-slate-800"
        />
      ))}
    </div>
  );
}
