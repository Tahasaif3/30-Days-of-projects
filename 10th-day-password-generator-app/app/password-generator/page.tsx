'use client'

import React, { useState } from 'react'
import { Slider } from "../components/ui/slider"
import { Switch } from "../components/ui/switch"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Copy } from 'lucide-react'
import Link from 'next/link'

export default function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const generatePassword = () => {
    let charset = ''
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (includeNumbers) charset += '0123456789'
    if (includeSymbols) charset += '!@#$%^&*()_+{}[]|:;<>,.?/~'

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(newPassword)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    alert('Password copied to clipboard!')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Password Generator</h1>
          
          <div className="mb-4">
            <Input
              type="text"
              value={password}
              readOnly
              className="w-full text-center text-lg font-mono"
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="length">Password Length: {length}</Label>
            <Slider
              id="length"
              min={8}
              max={32}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase">Include Uppercase</Label>
              <Switch
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase">Include Lowercase</Label>
              <Switch
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="numbers">Include Numbers</Label>
              <Switch
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="symbols">Include Symbols</Label>
              <Switch
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <Button onClick={generatePassword} className="w-full bg-purple-800 hover:bg-indigo-600 text-white">
              Generate Password
            </Button>
            
            <Button onClick={copyToClipboard} variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
              <Copy className="w-4 h-4 mr-2" />
              Copy to Clipboard
            </Button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" passHref>
              <Button className="w-full bg-purple-800 hover:bg-indigo-600 text-white">
                Back to Welcome Page
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-center py-4 mt-8 w-full">
        <p className="text-xl font-semibold">Made by Taha Saif (GIAIC Student)</p>
      </footer>
    </div>
  )
}
