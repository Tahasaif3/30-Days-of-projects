'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function GetStartedButton() {
  const router = useRouter()

  const handleGetStarted = async () => {
    try {
      console.log('Get Started clicked')
      await router.push('/birthday')
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }

  return (
    <motion.button
      onClick={handleGetStarted}
      whileHover={{ scale: 1.05, boxShadow: '0 0 8px rgb(255,255,255)' }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:from-purple-600 hover:to-pink-600 transition duration-300"
    >
      Get Started
    </motion.button>
  )
}
