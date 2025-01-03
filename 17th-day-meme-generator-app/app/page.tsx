'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MemeCanvas from '@/components/MemeCanvas'
import { motion } from "framer-motion"
import { Image } from 'lucide-react'

interface MemeTemplate {
  id: string
  name: string
  url: string
  box_count: number
}

export default function Home() {
  const [templates, setTemplates] = useState<MemeTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null)
  const [texts, setTexts] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => {
        setTemplates(data.data.memes)
        setLoading(false)
        console.log(loading)
      })
  }, [])

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(template)
      setTexts(new Array(template.box_count).fill(''))
    }
  }

  const handleTextChange = (index: number, value: string) => {
    const newTexts = [...texts]
    newTexts[index] = value
    setTexts(newTexts)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-4 py-8">
      <Card className="max-w-4xl mx-auto p-6 bg-white/90 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Meme Generator</h1>
          <p className="text-gray-600">Create and customize your own memes!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Select onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a meme template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedTemplate && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {texts.map((text, index) => (
                  <Input
                    key={index}
                    placeholder={`Text #${index + 1}`}
                    value={text}
                    onChange={(e) => handleTextChange(index, e.target.value)}
                  />
                ))}
              </motion.div>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            {selectedTemplate ? (
              <MemeCanvas template={selectedTemplate} texts={texts} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Image
                  className="h-16 w-16 mb-4"
                  aria-label="Template selection icon"                />
                <p>Select a template to get started</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </main>
  )
}

