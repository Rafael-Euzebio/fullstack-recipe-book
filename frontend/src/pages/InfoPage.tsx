import React from 'react'
import { useParams } from "react-router"
import { useFetchMeals } from '../hooks/useFetch'
import filterIngredients from '../helpers/filterIngredients'
import type { Meal } from '../types/meals'

const IngredentsSection = ({ meal }: { meal: Meal }) => {
  const ingredients = filterIngredients(meal)
  return (
    <ul className="flex flex-wrap justify-center gap-2">
      {ingredients.map((ingredient) => (
        <li
          key={ingredient}
          className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full"
        >
          {ingredient}
        </li>
      ))}
    </ul>
  )
}

const CategorySidebar = ({ category }: { category: string }) => {
  const { response, error } = useFetchMeals({
    filter: 'category',
    value: category,
  })
  const meals = response && !error ? response.meals : []

  return (
    <ul className="flex flex-col gap-2">
      {meals.map((meal) => (
        <li
          key={meal.idMeal}
          className="text-amber-700 hover:text-amber-900 transition"
        >
          {meal.strMeal}
        </li>
      ))}
    </ul>
  )
}

export const InfoPage = () => {
  const params = useParams()
  const id = params.id
  const { response, error } = useFetchMeals({ filter: 'id', value: id })
  const meal = response && !error ? response.meals[0] : null

  if (!meal) return <></>

  const {
    strMeal,
    strArea,
    strInstructions,
    strCategory,
    strMealThumb,
  } = meal

  return (
    <div className="w-full px-4 flex flex-col md:flex-row justify-center items-center gap-8 p-8">

      <div className="max-w-md w-full flex flex-col gap-6 md:self-start">
        <h1 className="text-4xl font-serif text-amber-800 text-center">
          {strMeal}
        </h1>

        <p className="text-center font-bold text-amber-600">
          {strArea}
        </p>

        <div className="flex justify-center">
          <img
            src={strMealThumb}
            alt={strMeal}
            className="w-full max-w-md rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-serif text-amber-800 mb-4 self-center"> Instructions </h2>
          <p className="text-amber-700 text-center">
            {strInstructions}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="text-2xl font-serif text-amber-800">
            Ingredients
          </h3>
          <IngredentsSection meal={meal} />
        </div>
      </div>

      <aside className="w-full lg:w-80 flex flex-col gap-4 bg-amber-50 p-4 rounded-lg shadow-md self-start">
        <h4 className="text-2xl font-serif text-amber-800 mb-4 self-center">
          Similar Meals
        </h4>
        <CategorySidebar category={strCategory} />
      </aside>
    </div>
  )
}
