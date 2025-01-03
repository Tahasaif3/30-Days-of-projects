import { RecipeCard } from '@/components/recipe-card'

interface RecipeGridProps {
  recipes: Array<{
    id: number
    title: string
    image: string
    readyInMinutes: number
    servings: number
    summary: string
  }>
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

