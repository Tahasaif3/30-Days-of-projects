'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getRecipeById } from '@/lib/api'
import { Loader2 } from 'lucide-react'
import { use } from 'react'

interface Ingredient {
  id: string;
  original: string;
}

interface Recipe {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  extendedIngredients: Ingredient[];
  instructions?: string;
}

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(unwrappedParams.id); 
        setRecipe(data);
      } catch (err) {
        setError('Failed to fetch recipe details.');
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading recipe...
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to search
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{recipe.title}</h1>

            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {recipe.readyInMinutes} minutes
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {recipe.servings} servings
              </Badge>
            </div>

            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />

            <div>
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="list-disc pl-5 space-y-2">
                {recipe.extendedIngredients.map((ingredient, index) => {
                  const key = `${ingredient.id || 'no-id'}-${ingredient.original}-${index}`;
                  return <li key={key}>{ingredient.original}</li>;
                })}
              </ul>

            </div>

            {recipe.instructions && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                <div
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
