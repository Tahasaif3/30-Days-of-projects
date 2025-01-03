'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import TimerDisplay from '@/components/TimerDisplay'
import TimerControls from '@/components/TimerControls'

export default function TimerPage() {
  const [time, setTime] = useState(25 * 60)
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
      setTime(isBreak ? 25 * 60 : 5 * 60)
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time, isBreak])

  const toggleTimer = () => setIsActive(!isActive)
  const resetTimer = () => {
    setTime(25 * 60)
    setIsActive(false)
    setIsBreak(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">{isBreak ? 'Break Time' : 'Focus Time'}</h1>
      <TimerDisplay time={time} isActive={isActive} />
      <TimerControls
        isActive={isActive}
        toggleTimer={toggleTimer}
        resetTimer={resetTimer}
      />
      <Button
        onClick={() => window.history.back()}
        className="mt-8 bg-white text-purple-600 hover:bg-gray-100"
      >
        Back to Home
      </Button>
    </div>
  )
}

