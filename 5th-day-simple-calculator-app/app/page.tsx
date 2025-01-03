'use client'

import Link from 'next/link'
import { Button } from "./components/ui/button"
import { motion } from "framer-motion"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center justify-center p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-6">Welcome to My Calculator App</h1>
        <p className="text-xl mb-8">A simple and elegant calculator for all your mathematical needs.</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Link href="/calculator">
          <Button className="bg-white text-purple-600 hover:bg-purple-100 text-lg px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
            Start Calculating
          </Button>
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12 text-sm"
      >
      </motion.div>
    </div>
  )
}