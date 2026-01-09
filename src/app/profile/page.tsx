import { ProfileInfo } from "./_components/ProfileInfo";
import { CollectionStats } from "./_components/CollectionStats";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
  const t = useTranslations("profile");

  return (
    <div className="flex-1 bg-slate-900">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">{t("title")}</h1>
          <p className="mt-2 text-slate-400">{t("subtitle")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ProfileInfo />
          <div className="lg:col-span-2">
            <CollectionStats />
          </div>
        </div>
      </div>
    </div>
  );
}
