'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import BirthdayForm from '../components/BirthdayForm'
import BirthdayWishes from '../components/BirthdayWishes'
import Footer from '../components/Footer'

const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false })
const DynamicParticleBackground = dynamic(() => import('../components/ParticleBackground'), { ssr: false })

export default function BirthdayPage() {
  const [birthday, setBirthday] = useState<Date | null>(null)
  const [name, setName] = useState<string>('')
  const [isBirthday, setIsBirthday] = useState<boolean>(false)
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (birthday) {
      const today = new Date()
      setIsBirthday(
        today.getDate() === birthday.getDate() &&
        today.getMonth() === birthday.getMonth()
      )
    }
  }, [birthday])

  useEffect(() => {
    if (isBirthday) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [isBirthday])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex flex-col justify-between p-4">
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center p-4 overflow-hidden">
      {isClient && <DynamicParticleBackground />}
      <AnimatePresence>
        {showConfetti && isClient && <DynamicConfetti recycle={false} numberOfPieces={500} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden w-full max-w-md"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="relative p-8"
          whileHover={{ rotateY: 5, rotateX: 5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <h1 className="text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Birthday Wishes
          </h1>
          {!birthday ? (
            <BirthdayForm onSubmit={(date, name) => { setBirthday(date); setName(name); }} />
          ) : (
            <BirthdayWishes name={name} isBirthday={isBirthday} birthday={birthday} />
          )}
        </motion.div>
      </motion.div>
    </main>
    <Footer/>
    </div>
  )
}