import React from 'react'
import { useParams } from "react-router"
import { useFetchMeals } from '../hooks/useFetch'
import filterIngredients from '../helpers/filterIngredients'
import type { Meal } from '../types/meals'

const IngredentsSection = ({ meal }: { meal: Meal }) => {

  const ingredients = filterIngredients(meal)
  return (
    <ul>
      {ingredients.map((ingredient) => {
        return <li key={ingredient}>{ingredient}</li>
      })}
    </ul>
  )
}

const CategorySidebar = ({ category }: { category: string }) => {
  const { response, error } = useFetchMeals({ filter: 'category', value: category })

  const meals = response && !error ? response.meals : null

  if (meals) {
    return (
      <aside>
        <h2>Similar Meals</h2>
        <ul>
          {meals.map((meal) => {
            return <li key={meal.idMeal}>{meal.strMeal}</li>
          })}
        </ul>
      </aside>
    )
  }
}

export const InfoPage = () => {

  const params = useParams()
  const id = params.id
  const { response, error } = useFetchMeals({ filter: 'id', value: id })
  const meal = response && !error ? response.meals[0] : null
  if (meal) {
    const { strMeal, strArea, strInstructions, strCategory, strMealThumb } = meal
    return (
      <div>
        <h1>{strMeal}</h1>
        <img width={300} height={300} src={strMealThumb} />
        <p>{strArea}</p>
        <p>{strInstructions}</p>
        <p>{strCategory}</p>
        <IngredentsSection meal={meal} />
        <CategorySidebar category={strCategory} />
      </div>
    )
  } else {
    <></>
  }
}

