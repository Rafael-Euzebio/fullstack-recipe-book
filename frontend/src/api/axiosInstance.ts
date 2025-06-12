import axios from 'axios'

const routes = {
  id: 'info?id=',
  ingredient: '?i=',
  category: '?c=',
  country: '?a=',
}
const mealsInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
})

export { routes, mealsInstance }
