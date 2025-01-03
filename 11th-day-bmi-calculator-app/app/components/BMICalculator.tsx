'use client'

import React, { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function BMICalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBMI] = useState<number | null>(null)

  const calculateBMI = () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      alert('Please enter valid height and weight values.')
      return
    }

    let bmiValue: number
    if (unit === 'metric') {
      bmiValue = w / ((h / 100) ** 2)
    } else {
      bmiValue = (w / (h ** 2)) * 703
    }

    setBMI(parseFloat(bmiValue.toFixed(1)))
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight'
    if (bmi < 25) return 'Normal weight'
    if (bmi < 30) return 'Overweight'
    return 'Obese'
  }

  return (
    <Card className="w-full max-w-md bg-gray-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">BMI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <RadioGroup defaultValue="metric" onValueChange={(value) => setUnit(value as 'metric' | 'imperial')} className="flex justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="metric" id="metric" />
              <Label htmlFor="metric">Metric</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="imperial" id="imperial" />
              <Label htmlFor="imperial">Imperial</Label>
            </div>
          </RadioGroup>

          <div>
            <Label htmlFor="height">Height ({unit === 'metric' ? 'cm' : 'inches'})</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
            />
          </div>

          <div>
            <Label htmlFor="weight">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
            />
          </div>

          <Button 
            onClick={calculateBMI} 
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-300"
          >
            Calculate BMI
          </Button>

          {bmi !== null && (
            <div className="mt-4 p-4 bg-blue-100 rounded-md">
              <p className="text-lg font-semibold">Your BMI: {bmi}</p>
              <p>Category: {getBMICategory(bmi)}</p>
            </div>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <footer className="mt-8 text-center bg-gray-100 py-4">
        <p className="font-bold text-gray-800">Made by Taha Saif (GIAIC Student)</p>
      </footer>
    </Card>
  )
}
