'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import MovieCard from '@/components/MovieCard'
import { motion, AnimatePresence } from "framer-motion"

interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchMovies = async () => {
    if (!query) return

    setLoading(true)
    setError('')
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      )
      const data = await res.json()
      
      if (data.results && data.results.length > 0) {
        setMovie(data.results[0])
      } else {
        setError('No movies found')
      }
    } catch (err) {
      setError('Failed to fetch movie')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white p-4">
      <Card className="max-w-2xl mx-auto p-8 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Movie Search</h1>
          <p className="text-gray-600 text-lg">
            Search for any movies and display details.
          </p>
        </motion.div>

        <div className="flex gap-2 mb-8">
          <Input
            type="text"
            placeholder="Enter movie name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && searchMovies()}
          />
          <Button
            onClick={searchMovies}
            className="bg-black hover:bg-gray-800 text-white px-8"
          >
            Search
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              Searching...
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-center py-8"
            >
              {error}
            </motion.div>
          )}

          {movie && !loading && (
            <MovieCard movie={movie} />
          )}
        </AnimatePresence>
      </Card>
    </main>
  )
}

