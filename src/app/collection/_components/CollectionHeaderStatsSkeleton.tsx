import { Skeleton } from "@/app/_components/Skeleton";

export function CollectionHeaderStatsSkeleton() {
  return (
    <div className="flex gap-4">
      <div className="min-w-[140px] rounded-xl border border-slate-700 bg-slate-800 p-4">
        <div className="mb-1 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-8 w-12" />
      </div>
      <div className="min-w-[140px] rounded-xl border border-slate-700 bg-slate-800 p-4">
        <div className="mb-1 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}
