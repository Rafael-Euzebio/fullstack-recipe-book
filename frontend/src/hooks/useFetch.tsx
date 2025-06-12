import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import mealsInstance from '../api/axiosInstance'
import { type ApiResponse } from '../types/meals'

export function useFetchMeals(filter?: string) {
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<AxiosError | Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      setError(null)

      try {
        const response = await mealsInstance.get('')
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
