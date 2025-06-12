import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { mealsInstance, routes } from '../api/axiosInstance'
import { type ApiResponse } from '../types/meals'
import type { Filter } from '../types/filter'

export function useFetchMeals(filter: Filter) {
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<AxiosError | Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      setError(null)

      try {
        const response = await mealsInstance.get(filter.type ? `${routes[filter.type]}${filter.value}` : '')
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
  }, [])


  return { response, error }
}
