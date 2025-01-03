'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [currentOperation, setCurrentOperation] = useState<string | null>(null)
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [isNewCalculation, setIsNewCalculation] = useState(true)

  const handleNumberClick = (num: string) => {
    if (isNewCalculation) {
      setDisplay(num)
      setIsNewCalculation(false)
    } else {
      setDisplay(prev => prev === '0' ? num : prev + num)
    }
  }

  const handleOperationClick = (operation: string) => {
    if (previousValue !== null && !isNewCalculation) {
      handleEquals()
    }
    setCurrentOperation(operation)
    setPreviousValue(parseFloat(display))
    setIsNewCalculation(true)
  }

  const handleEquals = () => {
    if (currentOperation && previousValue !== null) {
      const current = parseFloat(display)
      let result: number

      switch (currentOperation) {
        case '+':
          result = previousValue + current
          break
        case '-':
          result = previousValue - current
          break
        case '*':
          result = previousValue * current
          break
        case '/':
          result = previousValue / current
          break
        default:
          return
      }

      setDisplay(result.toString())
      setCurrentOperation(null)
      setPreviousValue(null)
      setIsNewCalculation(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setCurrentOperation(null)
    setPreviousValue(null)
    setIsNewCalculation(true)
  }

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(prev => prev + '.')
    }
  }

  const buttonClass = "w-16 h-16 text-xl font-semibold rounded-full transition-colors duration-200"

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-gray-100">
          <div className="text-right text-4xl font-bold text-gray-800 h-16 flex items-center justify-end overflow-x-auto">
            {display}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 p-4 bg-white">
          <Button onClick={handleClear} className={`${buttonClass} bg-red-500 hover:bg-red-600 text-white col-span-2`}>AC</Button>
          <Button onClick={() => handleOperationClick('/')} className={`${buttonClass} bg-gray-200 hover:bg-gray-300 text-gray-800`}>÷</Button>
          <Button onClick={() => handleOperationClick('*')} className={`${buttonClass} bg-gray-200 hover:bg-gray-300 text-gray-800`}>×</Button>
          
          <Button onClick={() => handleNumberClick('7')} className={`${buttonClass} bg-gray-100 hover:bg-gray-200 text-gray-800`}>7</Button>
          <Button onClick={() => handleNumberClick('8')} className={`${buttonClass} bg-gray-100 hover:bg-gray-200 text-gray-800`}>8</Button>
          <Button onClick={() => handleNumberClick('9')} className={`${buttonClass} bg-gray-100 hover:bg-gray-200 text-gray-800`}>9</Button>
          <Button onClick={() => handleOperationClick('-')} className={`${buttonClass} bg-gray-200 hover:bg-gray-300 text-gray-800`}>-</Button>
          
          <Button onClick={() => handleNumberClick('4')} className={`${buttonClass} bg-gray-100 hover:bg-gray-200 text-gray-800`}>4</Button>
          <Button onClick={() => handleNumberClick('5')} className={`${buttonClass} bg-gray-100 hover:bg-gray-200 text-gray-800`}>5</Button>
          <Button onClick={() => handleNumberClick('6')} className={`${buttonClass} bg-gray-100 hover:bg-gray-200 text-gray-800`}>6</Button>
          <Button onClick={() => handleOperationClick('+')} className={`${buttonClass} bg-gray-200 hover:bg-gray-300 text-gray-800`}>+</Button>
          
          <Button onClick={() => handleNumberClick('1')} className={`${buttonClass} bg-gray-100 hover:bg-gray-200 text-gray-800`}>1</Button>
          <Button onClick={() => handleNumberClick('2')} className={`${buttonClass} bg-gray-100 hover:bg-gray-200 text-gray-800`}>2</Button>
          <Button onClick={() => handleNumberClick('3')} className={`${buttonClass} bg-gray-100 hover:bg-gray-200 text-gray-800`}>3</Button>
          <Button onClick={handleEquals} className={`${buttonClass} bg-blue-500 hover:bg-blue-600 text-white row-span-2`}>=</Button>
          
          <Button onClick={() => handleNumberClick('0')} className={`${buttonClass} bg-gray-100 hover:bg-gray-200 text-gray-800 col-span-2`}>0</Button>
          <Button onClick={handleDecimal} className={`${buttonClass} bg-gray-100 hover:bg-gray-200 text-gray-800`}>.</Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-500 to-pink-500 text-white py-6 mt-8 w-full">
        <div className="text-center">
          <p className="text-2xl font-bold">Made By Taha Saif (GIAIC Student)</p>
        </div>
      </footer>
    </div>
  )
}
