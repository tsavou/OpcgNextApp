import { LoginForm } from "./_components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative flex w-full flex-1 items-center bg-slate-50 lg:relative">
      <div className="mx-auto w-full max-w-7xl py-12 lg:py-16">
        <div className="flex flex-col items-center justify-center px-6 sm:px-8 lg:w-1/2 lg:items-start xl:pr-16">
          <LoginForm />
        </div>
      </div>
      <div className="relative hidden h-full w-full bg-sky-950 lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">
        <Image
          src="/images/logpose.png"
          alt="LogPoseCards"
          width={1903}
          height={847}
          className="absolute inset-0 size-full object-contain"
        />
      </div>
    </div>
  );
}

