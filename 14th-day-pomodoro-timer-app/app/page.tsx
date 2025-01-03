'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"

const TIMER_DURATION = 25 * 60

export default function Home() {
  const [time, setTime] = useState(TIMER_DURATION)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsBreak(!isBreak)
      setTime(isBreak ? TIMER_DURATION : 5 * 60)
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time, isBreak])

  const toggleTimer = () => setIsActive(!isActive)
  const resetTimer = () => {
    setTime(TIMER_DURATION)
    setIsActive(false)
    setIsBreak(false)
  }

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const progress = (TIMER_DURATION - time) / TIMER_DURATION * 100

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <Card className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl">
        <motion.h1 
          className="text-4xl font-bold text-center text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isBreak ? 'Break Time' : 'Focus Time'}
        </motion.h1>
        <div className="relative">
          <svg className="w-full h-64" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ffffff33"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ffffff"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progress}, 100`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={time}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="text-6xl font-bold text-white"
              >
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          <Button
            onClick={toggleTimer}
            className={`px-6 py-2 rounded-full text-lg transition-all duration-300 ${
              isActive
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button
            onClick={resetTimer}
            className="px-6 py-2 rounded-full text-lg bg-yellow-500 hover:bg-yellow-600 transition-all duration-300"
          >
            Reset
          </Button>
        </div>
        <div className="mt-8">
          <Slider
            defaultValue={[TIMER_DURATION]}
            max={TIMER_DURATION}
            step={1}
            value={[time]}
            onValueChange={([newTime]) => setTime(newTime)}
            disabled={isActive}
            className="w-full"
          />
        </div>
      </Card>
    </div>
  )
}

