import Link from "next/link";
import Image from "next/image";

export function HeaderLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-xl font-bold transition-opacity"
    >
      <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
      <Image src="/images/logo-brand.png" alt="Logo" width={136} height={64} />
    </Link>
  );
}
