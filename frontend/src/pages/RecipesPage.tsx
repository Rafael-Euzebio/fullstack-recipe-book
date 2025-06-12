import React from 'react'
import { type Meal } from '../types/meals'
import { useFetchMeals } from '../hooks/useFetch'
import { MealLink } from '../components/MealLink'
import type { Filter } from '../types/filter'

interface IRecipesPage {
  filter: Filter
}

export const RecipesPage = ({ filter }: IRecipesPage) => {
  const { response, error } = useFetchMeals(filter)
  const meals = response && !error ? response.meals : null

  return (
    <div className="flex flex-col gap-4 bg-amber-50 rounded-lg shadow-md p-6">
      <h1 className="text-4xl font-serif text-amber-800 text-center mb-6">
        {filter.value ? `Filtered by: ${filter.value}` : 'All Recipes'}
      </h1>

      <ul className="flex flex-wrap justify-center gap-4 px-4 py-6">
        {meals?.map((meal: Meal) => {
          const { idMeal, strMeal } = meal
          return (
            <li
              key={idMeal}
              className="
                w-full
                sm:w-1/2
                md:w-1/3
                lg:w-1/4
              "
            >
              <MealLink
                href={`info/${idMeal}`}
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
                {strMeal}
              </MealLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

