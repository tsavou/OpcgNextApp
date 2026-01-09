import { useTranslations } from "next-intl";
import { AccountSettings } from "./_components/AccountSettings";
import { PreferencesSettings } from "./_components/PreferencesSettings";
import { SecuritySettings } from "./_components/SecuritySettings";

export default function SettingsPage() {
  const t = useTranslations("settings");
  
  return (
    <div className="flex-1 bg-slate-900">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
          <p className="mt-2 text-slate-400">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-6">
          <AccountSettings />
          <PreferencesSettings />
          <SecuritySettings />
        </div>
      </div>
    </div>
  );
}

