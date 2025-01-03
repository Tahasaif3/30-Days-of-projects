'use client'

import { useState, useEffect } from 'react'
import { Bell, Copy, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

const currencies = [
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
]

export function CurrencyConverter() {
  const [amount, setAmount] = useState('100')
  const [fromCurrency, setFromCurrency] = useState('EUR')
  const [toCurrency, setToCurrency] = useState('INR')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    setLastUpdated(new Date())
  }, [])

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`${amount} ${fromCurrency} = ${(Number(amount) * 89.01).toFixed(2)} ${toCurrency}`)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger className="w-full bg-white/10 border-0 h-[52px]">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center gap-2">
                    <span>{currency.flag}</span>
                    <span>{currency.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-white/10 border-0 h-[52px]"
          />
        </div>

        <div className="space-y-2">
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger className="w-full bg-white/10 border-0 h-[52px]">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center gap-2">
                    <span>{currency.flag}</span>
                    <span>{currency.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="h-[52px] flex items-center px-4 bg-white/10 rounded-md text-lg">
            {(Number(amount) * 89.01).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
          className="bg-white/10 border-0 h-12 w-12"
        >
          <Copy className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleSwap}
          className="bg-white/10 border-0 h-12 w-12"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 border-0 h-12 w-12"
        >
          <Bell className="h-5 w-5" />
        </Button>
      </div>

      {lastUpdated && (
        <div className="text-center text-sm text-gray-400">
          <p>LAST UPDATED</p>
          <p>{lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      )}
    </div>
  )
}
