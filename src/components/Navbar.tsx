import Link from "next/link";

export default function Navbar() {
    return (
        <nav>
            <ul className="flex justify-between gap-4">
                <li>
                    <Link href='/'>Docs</Link>
                </li>
                <li>
                    <Link href='/'>Sign In</Link>
                </li>
            </ul>
        </nav>
    )
}