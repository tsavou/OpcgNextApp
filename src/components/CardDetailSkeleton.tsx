export function CardDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb skeleton */}
        <div className="mb-6">
          <div className="h-4 w-64 animate-pulse rounded bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image skeleton */}
          <div className="space-y-4">
            <div className="aspect-[3/4] animate-pulse rounded-lg bg-gray-200"></div>

            {/* Badges skeleton */}
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-16 animate-pulse rounded-full bg-gray-200"></div>
              <div className="h-8 w-20 animate-pulse rounded-full bg-gray-200"></div>
              <div className="h-8 w-16 animate-pulse rounded-full bg-gray-200"></div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-6">
            {/* Title skeleton */}
            <div>
              <div className="mb-2 h-8 w-3/4 animate-pulse rounded bg-gray-200"></div>
              <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200"></div>
            </div>

            {/* Stats skeleton */}
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-pulse rounded-lg bg-gray-200 p-4">
                <div className="mb-2 h-4 w-16 rounded bg-gray-300"></div>
                <div className="h-8 w-12 rounded bg-gray-300"></div>
              </div>
              <div className="animate-pulse rounded-lg bg-gray-200 p-4">
                <div className="mb-2 h-4 w-20 rounded bg-gray-300"></div>
                <div className="h-8 w-12 rounded bg-gray-300"></div>
              </div>
            </div>

            {/* Description skeleton */}
            <div>
              <div className="mb-3 h-6 w-24 animate-pulse rounded bg-gray-200"></div>
              <div className="animate-pulse rounded-lg bg-gray-200 p-4">
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-gray-300"></div>
                  <div className="h-4 w-5/6 rounded bg-gray-300"></div>
                  <div className="h-4 w-4/6 rounded bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Types skeleton */}
            <div>
              <div className="mb-3 h-6 w-20 animate-pulse rounded bg-gray-200"></div>
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-6 w-18 animate-pulse rounded-full bg-gray-200"></div>
              </div>
            </div>

            {/* Price skeleton */}
            <div className="border-t pt-6">
              <div className="mb-3 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="animate-pulse rounded-lg bg-gray-200 p-4">
                  <div className="mb-2 h-4 w-20 rounded bg-gray-300"></div>
                  <div className="h-6 w-16 rounded bg-gray-300"></div>
                </div>
                <div className="animate-pulse rounded-lg bg-gray-200 p-4">
                  <div className="mb-2 h-4 w-24 rounded bg-gray-300"></div>
                  <div className="h-6 w-16 rounded bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
