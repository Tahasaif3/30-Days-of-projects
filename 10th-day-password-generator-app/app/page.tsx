import Link from 'next/link'
import { Button } from "./components/ui/button"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Welcome to my Password Generator</h1>
      <p className="text-xl mb-8 text-center max-w-md">Create secure and customizable passwords with ease using my advanced password generator.</p>
      <Link href="/password-generator">
        <Button className="bg-white text-blue-600 hover:bg-blue-100 transition-colors text-lg py-2 px-6">
          Start Generating
        </Button>
      </Link>
    </div>
  )
}