import { RegisterForm } from "./_components/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="relative flex flex-1 w-full bg-slate-900">
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/3 lg:px-8 xl:px-12">
        <div className="mb-8 lg:hidden">
          <Image
            src="/images/logo.png"
            alt="LogPose Cards"
            width={120}
            height={120}
            className="h-auto w-auto rounded-full"
          />
        </div>
        <RegisterForm />
      </div>

      <div className="relative hidden lg:block lg:w-2/3">
        <div className="absolute inset-0 bg-slate-900">
          <Image
            src="/images/logpose.png"
            alt="One Piece Map Background"
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
        </div>

        <div className="absolute bottom-12 right-12 z-20 max-w-md text-right">
          <blockquote className="text-xl font-medium italic text-slate-300/80">
            &quot;The destination is important, but the journey is even more important.&quot;
          </blockquote>
        </div>
      </div>
    </div>
  );
}

