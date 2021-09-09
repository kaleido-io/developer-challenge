import { CogIcon, CollectionIcon, HomeIcon, LogoutIcon } from "@heroicons/react/outline";
import { SVGProps } from "react";
/**
 * Interface for navigation link
 */
interface NavigationInterface {
    href: string;
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    name: string;
    secondaryNav: boolean;
}
/**
 * Navigation names and routes to show in primary and secondary navigation panels
 */
export const navigation: NavigationInterface[] = [
    { name: 'Home', href: '/', icon: HomeIcon, secondaryNav: false },
    { name: 'NFT Collections', href: '/collections', icon: CollectionIcon, secondaryNav: false },
    { name: 'Settings', href: '/settings', icon: CogIcon, secondaryNav: false },
    { name: 'Account Settings', href: '/settings', icon: CogIcon, secondaryNav: true },
    { name: 'Logout', href: '/logout', icon: LogoutIcon, secondaryNav: true }
]