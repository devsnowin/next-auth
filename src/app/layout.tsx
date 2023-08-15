import Navbar, { type NavItem } from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Next Auth | 101',
    description: 'Next JS app with full featured authentication',
};

const links: NavItem[] = [
    {
        title: 'Profile',
        href: '/profile',
    },
    {
        title: 'Sign In',
        href: '/signin',
    },
];

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} grid min-h-[100dvh] grid-rows-[auto_1fr_auto] px-4 text-slate-800`}
            >
                <header className="flex justify-between py-4">
                    <Link href="/" className="text-lg font-bold">
                        NextAuth .
                    </Link>
                    <Navbar navitems={links} />
                </header>
                <main>{children}</main>
                <footer className="py-4">
                    <p className="text-center">@{new Date().getFullYear()}</p>
                </footer>
            </body>
        </html>
    );
}
