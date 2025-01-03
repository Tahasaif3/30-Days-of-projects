'use client'

import React, { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>('') 
  const [tipPercentage, setTipPercentage] = useState<string>('15')
  const [numPeople, setNumPeople] = useState<string>('1')

  const calculateTip = (): { tipAmount: number; totalPerPerson: number } => {
    const bill = parseFloat(billAmount) || 0
    const tip = parseFloat(tipPercentage) || 0
    const people = parseInt(numPeople) || 1

    const tipAmount = (bill * tip) / 100
    const totalAmount = bill + tipAmount
    const totalPerPerson = totalAmount / people

    return {
      tipAmount: parseFloat(tipAmount.toFixed(2)),
      totalPerPerson: parseFloat(totalPerPerson.toFixed(2)),
    }
  }

  const { tipAmount, totalPerPerson } = calculateTip()

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Tip Calculator</h1>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="billAmount" className="text-gray-700">Bill Amount</Label>
            <Input
              id="billAmount"
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="Enter bill amount"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="tipPercentage" className="text-gray-700">Tip Percentage</Label>
            <Input
              id="tipPercentage"
              type="number"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(e.target.value)}
              placeholder="Enter tip percentage"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="numPeople" className="text-gray-700">Number of People</Label>
            <Input
              id="numPeople"
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
              placeholder="Enter number of people"
              className="mt-1"
            />
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-100 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-blue-800">Tip Amount:</span>
            <span className="text-2xl text-blue-600">${tipAmount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-blue-800">Total Per Person:</span>
            <span className="text-2xl text-blue-600">${totalPerPerson}</span>
          </div>
        </div>
        
        <Button 
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => {
            setBillAmount('')
            setTipPercentage('15')
            setNumPeople('1')
          }}
        >
          Reset
        </Button>
      </div>

      <footer className="bg-blue-100 text-blue-600 text-center py-4 mt-8 w-full">
        <p className="text-xl font-semibold">Made by Taha Saif (GIAIC Student)</p>
      </footer>
    </>
  )
}
