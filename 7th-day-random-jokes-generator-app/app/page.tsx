import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white border-opacity-20 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-white text-center font-orbitron">Welcome to Random Jokes Generator App</h1>
        <p className="text-xl mb-8 text-gray-200 text-center font-roboto">Experience jokes in style</p>
        <div className="flex justify-center">
          <Link href="/jokes-generator" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg font-roboto">
            Go to Random Jokes Generator App
          </Link>
        </div>
      </div>
    </main>
  )
}