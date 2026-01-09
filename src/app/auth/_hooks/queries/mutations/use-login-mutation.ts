"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export interface LoginPayload {
  email: string;
  password: string;
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      // Invalider la query de l'utilisateur pour forcer le re-fetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // Rediriger vers le profil ou la page demandée
      const redirectTo =
        new URLSearchParams(window.location.search).get("redirect") ||
        "/profile";
      router.push(redirectTo);
      router.refresh();
    },
    onError: (error) => {
      console.error("Erreur lors de la connexion:", error);
    },
  });
}
