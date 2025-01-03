const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY

export async function searchRecipes(query: string) {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&addRecipeInformation=true&number=12`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch recipes')
  }
  return response.json()
}

export async function getRecipeById(id: string) {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch recipe')
  }
  return response.json()
}

