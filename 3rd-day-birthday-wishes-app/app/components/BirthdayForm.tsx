'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface BirthdayFormProps {
  onSubmit: (date: Date, name: string) => void
}

export default function BirthdayForm({ onSubmit }: BirthdayFormProps) {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && date) {
      onSubmit(new Date(date), name)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
          placeholder="Enter your name"
          required
        />
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        <label htmlFor="birthday" className="block text-sm font-medium mb-2 text-white">
          Your Birthday
        </label>
        <input
          type="date"
          id="birthday"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
          required
        />
      </motion.div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.5)' }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300"
      >
        Show My Birthday Wish
      </motion.button>
    </motion.form>
  )
}