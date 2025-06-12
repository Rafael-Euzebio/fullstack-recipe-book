import React, { type Dispatch, type SetStateAction } from 'react'
import { useParams } from "react-router"
import { useFetchMeals } from '../hooks/useFetch'
import filterIngredients from '../helpers/filterIngredients'
import type { Meal } from '../types/meals'
import type { Filter } from '../types/filter'
import { MealLink } from '../components/MealLink'

const IngredentsSection = ({ meal, setFilter }: { meal: Meal, setFilter: Dispatch<SetStateAction<Filter>> }) => {
  const ingredients = filterIngredients(meal)

  return (
    <ul className="flex flex-wrap justify-center gap-2">
      {ingredients.map((ingredient) => (
        <li
          key={ingredient}
          className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full hover:bg-amber-200"
        >
          <MealLink
            href="/"
            filter={{ type: 'ingredient', value: ingredient }}
            setFilter={setFilter}
            className="inline-block rounded-full px-3 py-1 text-sm"
          >
            {ingredient}
          </MealLink>
        </li>
      ))}
    </ul>
  )
}

const CategorySidebar = ({ category, setFilter }: { category: string, setFilter: Dispatch<SetStateAction<Filter>> }) => {
  const { response, error } = useFetchMeals({
    type: 'category',
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
          <MealLink
            href="/"
            filter={{ type: 'category', value: category }}
            setFilter={setFilter}
            className=""
          >
            {meal.strMeal}
          </MealLink>
        </li>
      ))}
    </ul>
  )
}

export const InfoPage = ({ setFilter }: { setFilter: Dispatch<SetStateAction<Filter>> }) => {
  const params = useParams()
  const id = params.id ? params.id : ''
  const { response, error } = useFetchMeals({ type: 'id', value: id })
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

        <MealLink
          href="/"
          filter={{ type: 'country', value: strArea }}
          setFilter={setFilter}
          className="
            block
            w-full
            rounded-lg
            bg-amber-100
            px-4
            py-3
            text-center
            font-medium
            text-amber-900
            shadow-sm
            transition
            hover:bg-amber-200
            focus:outline-none
            focus:ring-2
            focus:ring-amber-500
          "
        >
          {strArea}
        </MealLink>

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
          <IngredentsSection meal={meal} setFilter={setFilter} />
        </div>
      </div>

      <aside className="w-full lg:w-80 flex flex-col gap-4 bg-amber-50 p-4 rounded-lg shadow-md self-start">
        <h4 className="text-2xl font-serif text-amber-800 mb-4 self-center">
          Similar Meals
        </h4>
        <CategorySidebar category={strCategory} setFilter={setFilter} />
      </aside>
    </div >
  )
}
