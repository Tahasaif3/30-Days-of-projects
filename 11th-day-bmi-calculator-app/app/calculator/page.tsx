import BMICalculator from '../components/BMICalculator'
import Link from 'next/link'

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <BMICalculator />
      <Link href="/" passHref>
        <button className="mt-8 bg-white text-blue-600 font-semibold py-2 px-6 rounded shadow hover:bg-blue-600 hover:text-white transition duration-300">
          Back to Welcome Page
        </button>
      </Link>
    </div>
  )
}
