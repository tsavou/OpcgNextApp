import { NavLinks, NavLink } from "./NavLinks";

interface DesktopNavProps {
  links: NavLink[];
}

export function DesktopNav({ links }: DesktopNavProps) {
  return (
    <NavLinks
      links={links}
      className="hidden items-center gap-6 md:flex"
      linkClassName="cursor-pointer text-sm font-semibold text-gray-200 transition-colors hover:text-yellow-500"
    />
  );
}
