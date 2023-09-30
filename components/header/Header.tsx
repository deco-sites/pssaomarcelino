import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import type { Product, Suggestion } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: ImageWidget;
    alt?: string;
  };
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Enable Top Search terms
   */
  suggestions?: Suggestion | null;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string; width: number; height: number };
}

function Header({
  alerts,
  navItems = [],
  logo,
}: Props) {
  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items: navItems }}
        >
          <div class="bg-base-100 fixed w-full z-50">
            {alerts.length > 0 && <Alert alerts={alerts} />}
            <Navbar items={navItems} logo={logo} />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
