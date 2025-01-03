import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClientProvider } from '../components/ClientProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Interactive Quiz App',
  description: 'Test your knowledge with our interactive quiz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}

