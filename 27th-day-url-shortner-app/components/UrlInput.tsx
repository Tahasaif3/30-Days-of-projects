import { motion } from 'framer-motion'

interface UrlInputProps {
  url: string
  setUrl: (url: string) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
}

export default function UrlInput({ url, setUrl, onSubmit, isLoading }: UrlInputProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your long URL"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        Shorten URL
      </motion.button>
    </form>
  )
}

