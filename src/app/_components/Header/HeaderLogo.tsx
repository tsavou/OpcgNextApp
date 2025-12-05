import Link from "next/link";
import Image from "next/image";

export function HeaderLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-xl font-bold transition-opacity"
    >
      <Image src="/images/logpose.png" alt="Logo" width={100} height={100} />
    </Link>
  );
}
