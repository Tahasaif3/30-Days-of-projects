import { GameComponent } from '../game/game-component'
import Link from 'next/link'
import { Button } from "../components/ui/button"

export default function GamePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary to-primary-foreground p-24">
      <h1 className="mb-8 text-4xl font-bold text-primary-foreground">Number Guessing Game</h1>
      <GameComponent />
      <Link href="/" className="mt-8">
        <Button variant="outline">
          Back to Home
        </Button>
      </Link>
    </main>
  )
}