'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'

interface UrlResultProps {
  shortUrl: string
}

export default function UrlResult({ shortUrl }: UrlResultProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6 p-4 bg-gray-100 rounded-md relative"
    >
      <p className="text-gray-700 mb-2">Shortened URL:</p>
      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-600 hover:underline break-all"
      >
        {shortUrl}
      </a>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-purple-600 focus:outline-none"
      >
        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </motion.button>
    </motion.div>
  )
}

