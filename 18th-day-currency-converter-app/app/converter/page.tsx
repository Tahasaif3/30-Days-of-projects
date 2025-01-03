'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CurrencyConverterClient } from './currency-converter-client'

// Initialize QueryClient
const queryClient = new QueryClient()

const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY

if (!API_KEY) {
  throw new Error('NEXT_PUBLIC_EXCHANGE_RATE_API_KEY is not defined')
}

const countries = [
  { code: 'USD', name: 'United States Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'GBP', name: 'British Pound Sterling', flag: '🇬🇧' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
]

export default function CurrencyConverter() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-8">
        <CurrencyConverterClient apiKey={API_KEY as string} countries={countries} />
      </div>
    </QueryClientProvider>
  )
}
