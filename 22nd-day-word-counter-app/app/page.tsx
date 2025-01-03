'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Type, Hash, Trash2, Book } from 'lucide-react'

export default function WordCounter() {
  const [text, setText] = useState('')

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const charCount = text.length
  const readingTime = Math.ceil(wordCount / 200);

  const handleClear = () => {
    setText('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Word Counter</h1>
            <p className="text-muted-foreground">Count words, characters, and estimate reading time</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enter your text</CardTitle>
              <CardDescription>
                Type or paste your text below to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Start typing or paste your text here..."
                className="min-h-[200px] resize-none"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              
              <div className="flex justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" disabled={text.length === 0}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will clear all the text you&apos;ve entered. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClear}>Clear</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key="words"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Type className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold">Words</h3>
                    </div>
                    <p className="text-3xl font-bold mt-2">{wordCount}</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                key="characters"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold">Characters</h3>
                    </div>
                    <p className="text-3xl font-bold mt-2">{charCount}</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                key="reading-time"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Book className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold">Reading Time</h3>
                    </div>
                    <p className="text-3xl font-bold mt-2">
                      {readingTime} {readingTime === 1 ? 'min' : 'mins'}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

