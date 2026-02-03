import { Skeleton } from "@/app/_components/Skeleton";

export function CardGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800/50 shadow-md backdrop-blur-sm"
        >
          <Skeleton aspectRatio="3/4" className="relative" />

          <div className="p-3">
            <div className="mb-2 space-y-2">
              <Skeleton height={16} width="100%" />
              <Skeleton height={16} width="75%" className="mx-auto" />
            </div>

            <div className="space-y-1 text-center">
              <Skeleton height={12} width="66%" className="mx-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
