import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { mealsInstance, routes } from '../api/axiosInstance'
import { type ApiResponse } from '../types/meals'

interface IuseFetchMeals {
  filter?: 'id' | 'ingredient' | 'category' | 'country' | null
  value?: string | null
}

export function useFetchMeals({ filter, value }: IuseFetchMeals) {
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<AxiosError | Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      setError(null)

      try {
        const response = await mealsInstance.get(filter ? `${routes[filter]}${value}` : '')
        setResponse(response.data)
      } catch (err: unknown) {

        if (axios.isAxiosError(err)) {
          setError(err)
        } else if (err instanceof Error) {
          setError(err)
        } else {
          setError(new Error(JSON.stringify(err)))
        }
      }
    }

    fetchData()
  }, [filter])

  return { response, error }
}
