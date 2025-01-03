'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BirthdayWishesProps {
  name: string
  isBirthday: boolean
  birthday: Date
}

const birthdayMessages = [
  "Wishing you a day that's as special as you are! 🎉",
  "May your day be filled with love, laughter, and endless joy! 🎈",
  "Here's to another year of amazing adventures! 🥳",
  "Cheers to you on your birthday! Enjoy every moment! 🎊",
  "Happy birthday! May all your dreams come true this year! 🌟",
]

export default function BirthdayWishes({ name, isBirthday, birthday }: BirthdayWishesProps) {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date()
    const nextBirthday = new Date(birthday)
    nextBirthday.setFullYear(now.getFullYear())
    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1)
    }
    const difference = +nextBirthday - +now

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }, [birthday])

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const [randomBirthdayMessage, setRandomBirthdayMessage] = useState<string>("")

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  useEffect(() => {
    if (isBirthday) {
      const message = birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)]
      setRandomBirthdayMessage(message)
    }
  }, [isBirthday])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.h2
        className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
      >
        {isBirthday ? `Happy Birthday, ${name}! 🎉` : `Hello, ${name}!`}
      </motion.h2>
      <AnimatePresence mode="wait">
        {isBirthday ? (
          <motion.div
            key="birthday"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-8xl mb-4"
            >
              🎂
            </motion.div>
            <motion.p
              className="text-xl mt-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {randomBirthdayMessage}
            </motion.p>
            <motion.div
              className="mt-6 space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {['🎈', '🎁', '🎊', '🥳'].map((emoji, index) => (
                <motion.span
                  key={index}
                  className="text-4xl inline-block"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: index * 0.2 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-2xl font-semibold text-white">
              Countdown to your next birthday:
            </p>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div
                  key={unit}
                  className="bg-white bg-opacity-20 rounded-lg p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    {value}
                  </span>
                  <p className="text-sm uppercase text-gray-300 mt-2">{unit}</p>
                </motion.div>
              ))}
            </div>
            <motion.p
              className="text-lg mt-6 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              We'll remember to celebrate with you on your special day!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
