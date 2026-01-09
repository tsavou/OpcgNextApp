"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export interface RegisterPayload {
  email: string;
  password: string;
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/profile`,
        },
      });

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      // Invalider la query de l'utilisateur pour forcer le re-fetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // Rediriger vers le profil
      router.push("/auth/sign-up-success");
      router.refresh();
    },
    onError: (error) => {
      console.error("Erreur lors de l'inscription:", error);
    },
  });
}

