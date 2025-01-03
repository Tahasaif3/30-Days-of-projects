'use client'

import React from 'react'
import { TipCalculator } from '../components/TipCalculator'
import Link from 'next/link'
import { Button } from "../components/ui/button"

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <TipCalculator />
      <Link href="/" className="mt-8">
        <Button variant="outline" className="bg-white text-blue-600 hover:bg-blue-100">
          Back to Welcome
        </Button>
      </Link>
    </div>
  )
}