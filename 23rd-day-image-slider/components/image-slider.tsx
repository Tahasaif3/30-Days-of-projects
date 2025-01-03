'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

interface UnsplashImage {
  id: string
  urls: {
    regular: string
  }
  alt_description: string
  user: {
    name: string
  }
}

const fetchImages = async (): Promise<UnsplashImage[]> => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?count=10&client_id=${UNSPLASH_ACCESS_KEY}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch images')
  }
  return response.json()
}

export function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)

  const { data: images, isLoading, isError } = useQuery<UnsplashImage[]>({
    queryKey: ['images'],
    queryFn: fetchImages,
  })

  const goToNext = useCallback(() => {
    if (images) {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }
  }, [images])

  const goToPrevious = () => {
    if (images) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      )
    }
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    if (isPlaying && autoPlay) {
      intervalId = setInterval(goToNext, 3000)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isPlaying, autoPlay, goToNext])

  if (isLoading) {
    return <Skeleton className="w-full aspect-video rounded-lg" />
  }

  if (isError) {
    return <div className="text-red-500">Error loading images. Please try again.</div>
  }

  if (!images || images.length === 0) {
    return <div>No images available.</div>
  }

  const currentImage = images[currentIndex]

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
        <Image
          src={currentImage.urls.regular}
          alt={currentImage.alt_description || 'Unsplash image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
          Photo by {currentImage.user.name} on Unsplash
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" size="icon" onClick={goToPrevious}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-play"
              checked={autoPlay}
              onCheckedChange={setAutoPlay}
            />
            <Label htmlFor="auto-play">Auto-play</Label>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={goToNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

