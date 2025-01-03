import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Random Jokes Generator',
  description: 'Get a laugh with our random joke generator!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-purple-500 to-indigo-600 min-h-screen flex items-center justify-center`}>
        {children}
      </body>
    </html>
  )
}