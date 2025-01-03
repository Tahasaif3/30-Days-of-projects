"use client"

import { ImageSlider } from '@/components/image-slider'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Dynamic Image Slider</h1>
        <ImageSlider />
      </div>
    </main>
  )
}

