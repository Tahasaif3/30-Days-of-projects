import type { Metadata } from 'next'
import { Roboto, Orbitron } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
})

export const metadata: Metadata = {
  title: 'Digital Clock',
  description: 'A stylish digital clock with 12/24 hour format toggle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${orbitron.variable} font-sans bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}