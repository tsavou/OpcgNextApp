import { PostFruitPayload } from "@/app/api/fruits/route";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePostFruitMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PostFruitPayload) =>
      await (
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fruits`, {
          method: "POST",
          body: JSON.stringify(payload),
        })
      ).json(),
    onSuccess: (data: Record<string, number>) => {
      //concept de mise à jour optimiste
      // on met à jour les données dans le cache
      queryClient.setQueryData(["fruits"], data);
      // on invalide les données dans le cache (on demande au backend de récupérer les données)
      queryClient.invalidateQueries({ queryKey: ["fruits"] });
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout du fruit:", error);
    },
  });
}
