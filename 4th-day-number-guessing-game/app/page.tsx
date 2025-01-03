import Link from 'next/link'
import { Button } from "./components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary to-primary-foreground p-24">
      <h1 className="mb-8 text-4xl font-bold text-primary-foreground">Number Guessing Game</h1>
      <p className="mb-8 text-xl text-primary-foreground">Try to guess the number between 1 and 100!</p>
      <Link href="/game">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-500 via-pink-500 to-red-500 text-white hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
        >
          Start Game
        </Button>
      </Link>
    </main>
  )
}
