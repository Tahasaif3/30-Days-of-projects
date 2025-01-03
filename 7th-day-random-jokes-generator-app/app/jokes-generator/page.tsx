'use client'

import { useJoke } from '../hooks/useJoke'

export default function Home() {
  const { joke, fetchJoke, isLoading, error } = useJoke()

  return (
    <main className="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Random Joke Generator</h1>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full">
        {isLoading ? (
          <p className="text-gray-600">Loading joke...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : joke ? (
          <>
            <p className="text-gray-800 mb-4">{joke.setup}</p>
            <p className="text-gray-600 italic">{joke.punchline}</p>
          </>
        ) : (
          <p className="text-gray-600">Click the button to get a joke!</p>
        )}
      </div>
      <button
        onClick={fetchJoke}
        disabled={isLoading}
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Loading...' : 'Get New Joke'}
      </button>
            
      <footer className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-6 mt-8 w-full">
        <div className="text-center">
          <p className="text-2xl font-bold">Made By Taha Saif (GIAIC Student)</p>
        </div>
      </footer>
    </main>
  )
}
