import { NavLinks, NavLink } from "./NavLinks";
import { AuthButtons } from "./AuthButtons";
import { UserMenu } from "./UserMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileMenuProps {
  isOpen: boolean;
  links: NavLink[];
  isAuthenticated: boolean;
  onLinkClick: () => void;
  onLogout: () => void;
}

export function MobileMenu({
  isOpen,
  links,
  isAuthenticated,
  onLinkClick,
  onLogout,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="border-t border-sky-800 bg-sky-900 md:hidden">
      <nav className="px-4 py-4">
        <NavLinks
          links={links}
          onLinkClick={onLinkClick}
          linkClassName="block rounded-lg px-4 py-2 text-base font-semibold text-gray-200 transition-colors hover:bg-sky-800 hover:text-yellow-400"
        />
        <div className="mt-4 border-t border-sky-800 pt-4">
          {isAuthenticated ? (
            <UserMenu
              onLogout={() => {
                onLogout();
                onLinkClick();
              }}
              onLinkClick={onLinkClick}
              variant="mobile"
            />
          ) : (
            <AuthButtons onLinkClick={onLinkClick} variant="mobile" />
          )}
        </div>
        <div className="mt-4 border-t border-gray-200 pt-4">
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
}
