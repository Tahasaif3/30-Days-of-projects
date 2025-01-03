import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface RecipeCardProps {
  recipe: {
    id: number
    title: string
    image: string
    readyInMinutes: number
    servings: number
    summary: string
  }
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video relative">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2">{recipe.title}</CardTitle>
          <CardDescription className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {recipe.readyInMinutes} mins
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {recipe.servings} servings
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="line-clamp-2 text-sm text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />
        </CardContent>
      </Card>
    </Link>
  )
}

