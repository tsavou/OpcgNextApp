import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  showMobileLogo?: boolean;
}

export function AuthLayout({
  children,
  showMobileLogo = true,
}: AuthLayoutProps) {
  return (
    <div className="relative flex w-full flex-1 bg-slate-900">
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/3 lg:px-8 xl:px-12">
        {showMobileLogo && (
          <div className="mb-8 lg:hidden">
            <Image
              src="/images/logo.png"
              alt="LogPose Cards"
              width={120}
              height={120}
              className="h-auto w-auto rounded-full"
            />
          </div>
        )}
        {children}
      </div>

      <div className="relative hidden lg:block lg:w-2/3">
        <Image
          src="/images/logpose.png"
          alt="One Piece Map Background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
