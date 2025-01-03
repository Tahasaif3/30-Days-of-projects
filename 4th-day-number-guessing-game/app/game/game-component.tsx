'use client'

import { useState, useEffect } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function GameComponent() {
  const [targetNumber, setTargetNumber] = useState<number>(0)
  const [guess, setGuess] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [attempts, setAttempts] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)

  useEffect(() => {
    resetGame()
  }, [])

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGuess('')
    setMessage('')
    setAttempts(0)
    setGameOver(false)
  }

  const handleGuess = () => {
    const guessNumber = parseInt(guess)
    if (isNaN(guessNumber)) {
      setMessage('Please enter a valid number.')
      return
    }

    setAttempts(attempts + 1)

    if (guessNumber === targetNumber) {
      setMessage(`Congratulations! You guessed the number in ${attempts + 1} attempts.`)
      setGameOver(true)
    } else if (guessNumber < targetNumber) {
      setMessage('Too low! Try a higher number.')
    } else {
      setMessage('Too high! Try a lower number.')
    }
  }

  return (
    <Card
      className="w-full max-w-md bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-6 rounded-lg shadow-lg text-white"
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Guess the number between 1 and 100</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="number"
            placeholder="Enter your guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={gameOver}
            onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
            className="text-black"
          />
          <Button onClick={handleGuess} disabled={gameOver} className="w-full bg-white text-black">
            Submit Guess
          </Button>
          {message && (
            <div className={`flex items-center ${gameOver ? 'text-green-500' : 'text-yellow-500'}`}>
              {gameOver ? <CheckCircle2 className="mr-2" /> : <AlertCircle className="mr-2" />}
              {message}
            </div>
          )}
          <p className="text-sm text-muted-foreground">Attempts: {attempts}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={resetGame} variant="outline" className="w-full text-black border-white">
          {gameOver ? 'Play Again' : 'Reset Game'}
        </Button>
      </CardFooter>
      <footer className="bg-white text-black text-sm py-4 mt-auto bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
          <div className="text-center">
            <p className="text-1.8xl font-bold text-center text-gray-800">Made By Taha Saif (GIAIC Student)</p>
          </div>
        </footer>
    </Card>
  )
}
