"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      // Supprimer les données de l'utilisateur du cache
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.clear();
      // Rediriger vers la page d'accueil
      router.push("/");
      router.refresh();
    },
    onError: (error) => {
      console.error("Erreur lors de la déconnexion:", error);
    },
  });
}
