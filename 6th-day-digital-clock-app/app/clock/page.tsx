'use client'

import { useState } from 'react'
import Link from 'next/link'
import DigitalClock from '../Components/DigitalClock'

export default function Clock() {
  const [is24Hour, setIs24Hour] = useState(true)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 sm:p-12 shadow-2xl border border-gray-700 max-w-2xl w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-white text-center font-orbitron">Digital Clock</h1>
        <div className="flex justify-center mb-8">
          <DigitalClock is24Hour={is24Hour} />
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setIs24Hour(!is24Hour)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg w-full sm:w-auto font-roboto"
          >
            Switch to {is24Hour ? '12-hour' : '24-hour'} format
          </button>
          <Link href="/" className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-full hover:bg-white hover:text-gray-900 transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto text-center font-roboto">
            Back to Welcome
          </Link>
        </div>
             {/* Footer */}
             <footer className="bg-gradient-to-br from-black-500 to-black-500 text-white py-6 mt-8 w-full">
        <div className="text-center">
          <p className="text-2xl font-bold">Made By Taha Saif (GIAIC Student)</p>
        </div>
      </footer>
      </div>
    </main>
  )
}