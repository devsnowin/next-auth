import Link from 'next/link';

export type NavItem = {
    title: string;
    href: string;
};

type NavbarProps = {
    navitems: NavItem[];
};

export default function Navbar({ navitems }: NavbarProps) {
    return (
        <nav>
            <ul className="flex justify-between gap-4">
                {navitems.map((item, i) => (
                    <li key={i}>
                        <Link href={item.href}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
