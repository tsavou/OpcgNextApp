import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export const LOCALES = ["fr", "en"] as const;

type Locale = (typeof LOCALES)[number];

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = (store.get("locale")?.value || "fr") as Locale;

  return {
    locale,
    messages: (await import(`../../messages`))[locale],
  };
});
