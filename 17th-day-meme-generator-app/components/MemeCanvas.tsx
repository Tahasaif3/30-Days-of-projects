'use client'


import { useEffect, useRef } from 'react'

interface MemeCanvasProps {
  template: {
    url: string
    box_count: number
  }
  texts: string[]
}

export default function MemeCanvas({ template, texts }: MemeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = template.url

    image.onload = () => {
      canvas.width = image.width
      canvas.height = image.height

      ctx.drawImage(image, 0, 0)

      ctx.fillStyle = 'white'
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 3
      ctx.textAlign = 'center'

      const fontSize = Math.floor(canvas.height / 12)
      ctx.font = `bold ${fontSize}px Impact`

      texts.forEach((text, index) => {
        const y = index === 0 
          ? fontSize + 10 
          : canvas.height - ((texts.length - index) * (fontSize + 10))
        
        ctx.strokeText(text, canvas.width / 2, y)
        ctx.fillText(text, canvas.width / 2, y)
      })
    }
  }, [template, texts])

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'meme.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto rounded-lg shadow-lg"
      />
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Download Meme
      </button>
    </div>
  )
}

