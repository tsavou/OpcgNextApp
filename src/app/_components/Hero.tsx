import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("homePage");
  return (
    <section className="bg-amber-50 lg:relative">
      <div className="mx-auto w-full max-w-7xl pt-16 pb-16 text-center lg:py-32 lg:text-left">
        <div className="px-6 sm:px-8 lg:w-1/2 xl:pr-16">
          <h1 className="text-4xl leading-tight font-bold">
            <span className="bg-gradient-to-r from-sky-800 to-sky-700 bg-clip-text text-transparent">
              LogPoseCards
            </span>
          </h1>
          <p className="text-md mx-auto mt-3 max-w-md whitespace-pre-line text-gray-700 md:mt-5 md:max-w-3xl">
            {t("description")}
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="group/exploreSets relative mt-3 overflow-hidden rounded-md transition-all duration-300 hover:shadow-2xl sm:mt-0 sm:mr-3">
              <Link
                href="#sets"
                className="relative z-10 flex w-full items-center justify-center rounded-md border border-sky-800 px-8 py-3 text-base font-medium text-sky-800 transition-all hover:scale-105 hover:bg-sky-800 hover:text-white md:px-10 md:py-4"
              >
                {t("exploreSets")}
              </Link>
              <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-md">
                <div className="absolute top-0 -left-full h-full w-[200%] bg-none transition-transform duration-1000 group-hover/exploreSets:translate-x-[150%] group-hover/exploreSets:bg-gradient-to-r group-hover/exploreSets:from-transparent group-hover/exploreSets:via-white/30 group-hover/exploreSets:to-transparent" />
              </div>
            </div>

            <div className="group/seeAllCards relative mt-3 overflow-hidden rounded-md transition-all duration-300 hover:shadow-2xl sm:mt-0">
              <Link
                href="/auth/register"
                className="relative z-10 flex w-full items-center justify-center rounded-md bg-gradient-to-r from-yellow-600 to-yellow-400 px-8 py-3 text-base font-medium text-white transition-all hover:scale-105 md:px-10 md:py-4"
              >
                {t("joinUs")}
              </Link>
              <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-md">
                <div className="absolute top-0 -left-full h-full w-[200%] bg-none transition-transform duration-1000 group-hover/seeAllCards:translate-x-[150%] group-hover/seeAllCards:bg-gradient-to-r group-hover/seeAllCards:from-transparent group-hover/seeAllCards:via-white/30 group-hover/seeAllCards:to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-64 w-full sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
        <Image
          src="/images/logpose.png"
          alt="Hero banner"
          width={1903}
          height={847}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </section>
  );
}
