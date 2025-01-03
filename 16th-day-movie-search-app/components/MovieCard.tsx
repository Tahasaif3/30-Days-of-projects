import { motion } from "framer-motion"
import { Calendar, Star } from 'lucide-react'

interface MovieCardProps {
  movie: {
    title: string
    overview: string
    poster_path: string
    release_date: string
    vote_average: number
  }
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center"
    >
      {movie.poster_path && (
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg shadow-xl mb-6 max-w-full h-auto"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      )}

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl font-bold text-center mb-4"
      >
        {movie.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-600 text-center mb-6 max-w-prose"
      >
        {movie.overview}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-6 text-gray-500"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(movie.release_date).getFullYear()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

