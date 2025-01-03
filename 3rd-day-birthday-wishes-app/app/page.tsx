"use client"
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import GetStartedButton from './components/GetStartedButton'
import Footer from './components/Footer'

const DynamicParticleBackground = dynamic(() => import('./components/ParticleBackground'), { ssr: false })

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex flex-col justify-between p-4">
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center p-4 overflow-hidden">
      <DynamicParticleBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden w-full max-w-md p-8 text-center"
      >
        <motion.h1
          className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
        >
          Welcome to Birthday Wishes
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Celebrate birthdays in style with our interactive app!
        </motion.p>
        <GetStartedButton />
      </motion.div>
    </main>
    
    <Footer/>
    </div>
  )
}