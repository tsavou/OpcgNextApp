import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("homePage");
  return (
    <section className="relative flex min-h-[500px] w-full bg-slate-900 lg:relative">
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:px-8 xl:px-12">
        <div className="w-full max-w-md space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl mb-8 font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                LogPoseCards
              </span>
            </h1>
            <p className="text-lg text-slate-400 sm:text-xl">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="#sets"
              className="cursor-pointer inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-sky-500 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {t("exploreSets")}
            </Link>

            <Link
              href="/auth/register"
              className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 px-8 py-3.5 text-base font-bold text-slate-900 shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.02] hover:shadow-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {t("joinUs")}
            </Link>
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block lg:w-1/2">
        <div className="absolute inset-0 bg-slate-900">
          <Image
            src="/images/logpose.png"
            alt="One Piece Map Background"
            fill
            className="object-cover opacity-80 mix-blend-overlay"
            priority
          />
        </div>

        <div className="absolute bottom-2 right-2 z-20 max-w-md text-right">
          <blockquote className="text-md font-medium italic text-slate-300/80">
            &quot;The destination is important, but the journey is even more important.&quot;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
