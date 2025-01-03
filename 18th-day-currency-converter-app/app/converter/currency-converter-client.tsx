'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import type { ExchangeRateResponse } from '@/types/api'

const fetchExchangeRates = async (apiKey: string, baseCurrency: string): Promise<ExchangeRateResponse> => {
  const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

interface Country {
  code: string
  name: string
  flag: string
}

interface CurrencyConverterClientProps {
  apiKey: string
  countries: Country[]
}

export function CurrencyConverterClient({ apiKey, countries }: CurrencyConverterClientProps) {
  const [amount, setAmount] = useState('1')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['exchangeRates', fromCurrency],
    queryFn: () => fetchExchangeRates(apiKey, fromCurrency),
    refetchInterval: 60000,
    enabled: !!apiKey
  })

  const handleConvert = () => {
    if (data?.conversion_rates) {
      const rate = data.conversion_rates[toCurrency]
      return (parseFloat(amount) * rate).toFixed(2)
    }
    return '0.00'
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
        <CardDescription>Convert between world currencies with real-time exchange rates.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger id="fromCurrency" className="mt-1">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.flag} {country.code} - {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger id="toCurrency" className="mt-1">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.flag} {country.code} - {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={() => handleConvert()} className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Convert'
            )}
          </Button>
          {isError && (
            <p className="text-red-500 text-sm">Error fetching exchange rates. Please try again.</p>
          )}
          {!isLoading && !isError && data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-4"
            >
              <p className="text-2xl font-bold">
                {amount} {fromCurrency} = {handleConvert()} {toCurrency}
              </p>
              {data.conversion_rates && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  1 {fromCurrency} = {data.conversion_rates[toCurrency]} {toCurrency}
                </p>
              )}
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

