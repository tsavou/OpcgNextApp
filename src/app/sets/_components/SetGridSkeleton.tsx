export function SetGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded-xl bg-gradient-to-br from-gray-200 to-gray-300"
        />
      ))}
    </div>
  );
}
