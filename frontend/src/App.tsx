import React from 'react'
import { type Meal } from './types/meals';
import { useFetchMeals } from './hooks/useFetch';

function App() {
  const { response, error } = useFetchMeals()
  const meals = response ? response.meals : null
  return (
    <>
      <ul>
        {
          meals != null ? meals.map((meal: Meal) => {
            return <li key={meal.idMeal}>{meal.strMeal}</li>
          })
            : <></>
        }
      </ul>
    </>
  )
}

export default App
