'use client'

import { useState, useEffect } from 'react'

interface DigitalClockProps {
  is24Hour: boolean
}

export default function DigitalClock({ is24Hour }: DigitalClockProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatTime = (date: Date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    let ampm = ''

    if (!is24Hour) {
      ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
    }

    const formattedHours = hours.toString().padStart(2, '0')

    return `${formattedHours}:${minutes}:${seconds}${is24Hour ? '' : ' ' + ampm}`
  }

  return (
    <div className="text-6xl sm:text-7xl md:text-8xl font-bold font-orbitron bg-gradient-to-r from-blue-400 to-teal-300 text-transparent bg-clip-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
      {formatTime(time)}
    </div>
  )
}