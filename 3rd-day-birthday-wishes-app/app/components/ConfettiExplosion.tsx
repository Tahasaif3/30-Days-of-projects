'use client'

import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

export default function ConfettiExplosion() {
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 })

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    detectSize()
    window.addEventListener('resize', detectSize)
    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [])

  return (
    <Confetti
      width={windowDimension.width}
      height={windowDimension.height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.2}
      colors={['#f0f', '#0ff', '#ff0', '#f00', '#0f0', '#00f']}
      confettiSource={{
        x: windowDimension.width / 2,
        y: windowDimension.height / 2,
        w: 0,
        h: 0
      }}
      initialVelocityX={15}
      initialVelocityY={35}
    />
  )
}