import React from 'react'
import { type Meal } from '../types/meals';
import { useFetchMeals } from '../hooks/useFetch';
import { MealLink } from '../components/MealLink';

export const RecipesPage = () => {
  const { response, error } = useFetchMeals({})
  const meals = response && !error ? response.meals : null

  return (
    <div className="flex flex-col gap-4 bg-amber-50 rounded-lg shadow-md">
      <h1 className="text-4xl font-serif text-amber-800 text-center mb-6">
        All Recipes
      </h1>

      <ul className="flex flex-wrap gap-4 justify-center m-4">
        {meals != null
          ? meals.map((meal: Meal) => {
            const { idMeal, strMeal } = meal
            return (
              <li
                key={idMeal}
                className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4"
              >
                <MealLink
                  href={`info/${idMeal}`}
                >
                  {strMeal}
                </MealLink>
              </li>
            )
          })
          : <li className="w-full text-center text-amber-700">No recipes yet.</li>}
      </ul>
    </div>
  )
}

