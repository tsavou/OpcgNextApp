"use client";

import { useEffect } from "react";

export function SetLocaleCookie() {
  useEffect(() => {
    cookieStore.set("locale", navigator.language.split("-")[0]);
  }, []);
  return null;
}
