import React from 'react'
import { type Meal } from '../types/meals'
import { useFetchMeals } from '../hooks/useFetch'
import { MealLink } from '../components/MealLink'
import type { Filter } from '../types/filter'
import { List } from './List'

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
      {
        meals ?
          <List
            items={meals}
            listClassName="flex flex-wrap justify-center gap-4 px-4 py-6"
            itemClassName="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            renderItem={(meal: Meal) => (
              <MealLink
                href={`info/${meal.idMeal}`}
                className="block w-full rounded-lg bg-amber-100 px-4 py-3 text-center font-medium text-amber-900 shadow-sm transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {meal.strMeal}
              </MealLink>
            )}
          /> :
          <></>
      }
    </div>
  )
}

