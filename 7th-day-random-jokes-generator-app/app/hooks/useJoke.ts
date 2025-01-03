'use client'

import { useState, useCallback } from 'react'

interface Joke {
  setup: string
  punchline: string
}

export function useJoke() {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchJoke = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke')
      if (!response.ok) {
        throw new Error('Failed to fetch joke')
      }
      const data: Joke = await response.json()
      setJoke(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { joke, fetchJoke, isLoading, error }
}