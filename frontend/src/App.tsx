import React from 'react'
import { type Meal } from './types/meals';
import { useFetchMeals } from './hooks/useFetch';
import { MealLink } from './components/MealLink';

function App() {
  const { response, error } = useFetchMeals({})
  const meals = response && !error ? response.meals : null
  return (
    <>
      <ul>
        {
          meals != null ? meals.map((meal: Meal) => {
            const { idMeal, strMeal } = meal
            return (
              <li key={idMeal}>
                <MealLink href={`info/${idMeal}`}>{strMeal}</MealLink>
              </li>
            )
          })
            : <></>
        }
      </ul>
    </>
  )
}

export default App
