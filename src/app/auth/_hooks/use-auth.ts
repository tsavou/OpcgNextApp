"use client";

import { useUserQuery } from "./queries/use-user-query";

export function useAuth() {
  const { data: user, isLoading, error } = useUserQuery();

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
  };
}
