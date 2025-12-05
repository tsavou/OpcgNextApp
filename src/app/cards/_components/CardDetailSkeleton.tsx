import { Skeleton } from "@/app/_components/Skeleton";

export function CardDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Skeleton height={16} width={256} />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Skeleton aspectRatio="3/4" rounded="lg" />

            <div className="flex flex-wrap gap-2">
              <Skeleton height={32} width={64} rounded="full" />
              <Skeleton height={32} width={80} rounded="full" />
              <Skeleton height={32} width={64} rounded="full" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Skeleton height={32} width="75%" className="mb-2" />
              <Skeleton height={24} width="50%" />
            </div>

            <div className="border-t pt-6">
              <Skeleton height={24} width={128} className="mb-3" />
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-200 p-4">
                  <Skeleton
                    height={16}
                    width={80}
                    className="mb-2 bg-gray-300"
                  />
                  <Skeleton height={24} width={64} className="bg-gray-300" />
                </div>
                <div className="rounded-lg bg-gray-200 p-4">
                  <Skeleton
                    height={16}
                    width={96}
                    className="mb-2 bg-gray-300"
                  />
                  <Skeleton height={24} width={64} className="bg-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
