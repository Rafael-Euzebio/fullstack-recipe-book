import type { Meal } from "../types/meals"

export default function filterIngredients(meal: Meal): string[] {
  const ingredients: string[] = []

  for (let i = 1; i <= 20; i++) {
    const key = `strIngredient${i}` as keyof Meal
    const value = meal[key]?.trim()

    if (value) {
      ingredients.push(value)
    }
  }

  return ingredients
}
