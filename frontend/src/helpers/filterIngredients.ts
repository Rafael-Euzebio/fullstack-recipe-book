import type { Meal } from "../types/meals"

export default function filterIngredients(meal: Meal): string[] {
  const ingredients: string[] = []

  for (let i = 1; i <= 20; i++) {
    const key = `strIngredient${i}` as keyof Meal
    const raw = meal[key]
    const value = typeof raw === 'string' ? raw.trim() : ''

    if (value && !ingredients.includes(value)) {
      ingredients.push(value)
    }
  }

  return ingredients
}

