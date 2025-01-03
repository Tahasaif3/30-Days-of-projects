'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import UnitConverter from '@/components/UnitConverter'

export default function Home() {
  const [showConverter, setShowConverter] = useState(false)

  if (showConverter) {
    return <UnitConverter />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Welcome to my Unit Converter</CardTitle>
          <CardDescription className="text-center">
            Easily convert between different units of length, weight, and temperature.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => setShowConverter(true)} size="lg">
            Go to Unit Converter App
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}