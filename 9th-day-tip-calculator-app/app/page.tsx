import Link from 'next/link'
import { Button } from "./components/ui/button"

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Tip Calculator</h1>
        <p className="text-xl text-white mb-8">Calculate tips easily and quickly</p>
        <Link href="/calculator">
          <Button className="bg-lightblue text-blue-600 hover:bg-blue-100 transition-colors">
            Start Calculating
          </Button>
        </Link>
      </div>
    </div>
  )
}