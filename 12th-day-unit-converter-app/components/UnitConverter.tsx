'use client'

import { useState } from 'react'
import { ArrowRightLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type UnitType = 'length' | 'weight' | 'volume' | 'temperature'

type Unit = {
  name: string
  factor: number
}

const unitTypes: Record<UnitType, Unit[]> = {
  length: [
    { name: 'Meters', factor: 1 },
    { name: 'Feet', factor: 3.28084 },
    { name: 'Inches', factor: 39.3701 },
    { name: 'Centimeters', factor: 100 },
    { name: 'Kilometers', factor: 0.001 },
    { name: 'Miles', factor: 0.000621371 },
    { name: 'Yards', factor: 1.09361 },
  ],
  weight: [
    { name: 'Kilograms', factor: 1 },
    { name: 'Pounds', factor: 2.20462 },
    { name: 'Ounces', factor: 35.274 },
    { name: 'Grams', factor: 1000 },
    { name: 'Metric Tons', factor: 0.001 },
    { name: 'US Tons', factor: 0.00110231 },
    { name: 'Stone', factor: 0.157473 },
  ],
  volume: [
    { name: 'Liters', factor: 1 },
    { name: 'Gallons (US)', factor: 0.264172 },
    { name: 'Quarts (US)', factor: 1.05669 },
    { name: 'Pints (US)', factor: 2.11338 },
    { name: 'Cups', factor: 4.22675 },
    { name: 'Milliliters', factor: 1000 },
    { name: 'Cubic Meters', factor: 0.001 },
  ],
  temperature: [
    { name: 'Celsius', factor: 1 },
    { name: 'Fahrenheit', factor: 1 },
    { name: 'Kelvin', factor: 1 },
  ],
}

export default function UnitConverter() {
  const [unitType, setUnitType] = useState<UnitType>('length')
  const [fromUnit, setFromUnit] = useState<string>(unitTypes[unitType][0].name)
  const [toUnit, setToUnit] = useState<string>(unitTypes[unitType][1].name)
  const [fromValue, setFromValue] = useState<string>('1')
  const [toValue, setToValue] = useState<string>('')

  const handleConvert = () => {
    const from = unitTypes[unitType].find(u => u.name === fromUnit)
    const to = unitTypes[unitType].find(u => u.name === toUnit)
    
    if (!from || !to) return

    let result: number

    if (unitType === 'temperature') {
      if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') {
        result = (parseFloat(fromValue) * 9/5) + 32
      } else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') {
        result = (parseFloat(fromValue) - 32) * 5/9
      } else if (fromUnit === 'Celsius' && toUnit === 'Kelvin') {
        result = parseFloat(fromValue) + 273.15
      } else if (fromUnit === 'Kelvin' && toUnit === 'Celsius') {
        result = parseFloat(fromValue) - 273.15
      } else if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') {
        result = (parseFloat(fromValue) - 32) * 5/9 + 273.15
      } else if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') {
        result = (parseFloat(fromValue) - 273.15) * 9/5 + 32
      } else {
        result = parseFloat(fromValue)
      }
    } else {
      result = (parseFloat(fromValue) * from.factor) / to.factor
    }

    setToValue(result.toFixed(4))
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Unit Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="unitType">Unit Type</Label>
              <Select value={unitType} onValueChange={(value: UnitType) => {
                setUnitType(value)
                setFromUnit(unitTypes[value][0].name)
                setToUnit(unitTypes[value][1].name)
                setFromValue('1')
                setToValue('')
              }}>
                <SelectTrigger id="unitType">
                  <SelectValue placeholder="Select unit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="length">Length</SelectItem>
                  <SelectItem value="weight">Weight</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                  <SelectItem value="temperature">Temperature</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Label htmlFor="fromUnit">From</Label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger id="fromUnit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitTypes[unitType].map((unit) => (
                      <SelectItem key={unit.name} value={unit.name}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="icon" onClick={handleSwap} className="mt-6">
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <Label htmlFor="toUnit">To</Label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger id="toUnit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitTypes[unitType].map((unit) => (
                      <SelectItem key={unit.name} value={unit.name}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="fromValue">Value</Label>
              <Input
                id="fromValue"
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
              />
            </div>
            <Button onClick={handleConvert} className="w-full">
              Convert
            </Button>
            {toValue && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <p className="text-center">
                  <span className="font-semibold">{fromValue}</span> {fromUnit} =
                </p>
                <p className="text-center text-2xl font-bold">
                  {toValue} {toUnit}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}