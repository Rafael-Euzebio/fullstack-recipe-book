import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import mealsInstance from '../api/axiosInstance'
import { type ApiResponse } from '../types/meals'

interface IuseFetchMeals {
  id?: string | null
  filter?: string | null
}
export function useFetchMeals({ id, filter }: IuseFetchMeals) {
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<AxiosError | Error | null>(null)
  const search = filter ? filter : ''

  useEffect(() => {
    async function fetchData() {
      setError(null)

      try {
        const response = await mealsInstance.get(id ? `/info?id=${id}` : search)
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
