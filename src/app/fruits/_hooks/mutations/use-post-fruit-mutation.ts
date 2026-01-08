import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostFruitPayload } from "~/app/api/fruits/route";

export function usePostFruitMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: PostFruitPayload) =>
			(
				await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fruits`, {
					method: "POST",
					body: JSON.stringify(payload),
				})
			).json(),
		onSuccess: (data: Record<string, number>) => {
			// 👇 Concept de mise à jour optimiste (optimistic update)
			queryClient.setQueryData(["fruits"], data);
			queryClient.invalidateQueries({ queryKey: ["fruits"] });
		},
	});
}
