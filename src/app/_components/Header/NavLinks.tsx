import Link from "next/link";

export interface NavLink {
  href: string;
  label: string;
}

interface NavLinksProps {
  links: NavLink[];
  onLinkClick?: () => void;
  className?: string;
  linkClassName?: string;
}

export function NavLinks({
  links,
  onLinkClick,
  className = "",
  linkClassName = "",
}: NavLinksProps) {
  return (
    <nav className={className}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={linkClassName}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
