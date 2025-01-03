import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Unit Converter',
  description: 'Convert between different units of measurement',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
          </main>
          <footer className="border-t py-4 text-center text-sm text-gray-500 text-3xl font-bold">
            Made by Taha Saif (GIAIC Student)
          </footer>
        </div>
      </body>
    </html>
  )
}