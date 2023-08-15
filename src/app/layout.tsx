import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Auth | 101',
  description: 'Next JS app with full featured authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-[100dvh] px-4 grid grid-rows-[auto_1fr_auto]`}>
        <header className='py-4 flex justify-between'>
          <Link href='/' className='font-bold text-lg'>NextAuth .</Link>
          <Navbar />
        </header>
        <main>
        {children}
        </main>
        <footer className='py-4'>
          <p className='text-center'>@{new Date().getFullYear()}</p>
        </footer>
        </body>
    </html>
  )
}
