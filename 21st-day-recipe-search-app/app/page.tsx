'use client'

import { useState } from 'react'
import { SearchBar } from '@/components/search-bar'
import { RecipeGrid } from '@/components/recipe-grid'
import { searchRecipes } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (query: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await searchRecipes(query)
      setRecipes(data.results)
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center space-y-10">
          {/* Title Section */}
          <h1 className="text-4xl font-extrabold text-center text-gray-800 sm:text-5xl">
            Discover Delicious Recipes
          </h1>
          
          {/* Search Bar Section */}
          <div className="w-full max-w-md">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center space-x-2">
              <Button disabled className="flex items-center bg-blue-600 text-white hover:bg-blue-700">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading recipes...
              </Button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center text-lg font-medium">{error}</div>
          )}

          {/* Recipe Grid */}
          {recipes.length > 0 && <RecipeGrid recipes={recipes} />}

          {/* Empty State */}
          {!loading && !error && recipes.length === 0 && (
            <div className="text-center text-gray-500 text-lg">
           Start by searching for something tasty!
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
