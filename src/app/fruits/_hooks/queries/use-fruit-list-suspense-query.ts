import { useSuspenseQuery } from "@tanstack/react-query";

export function useFruitListSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: ["fruits"],
    queryFn: async (): Promise<Record<string, number>> =>
      (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fruits`)).json(),
  });
}
