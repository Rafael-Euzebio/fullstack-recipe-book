import axios from 'axios'

const routes = {
  id: 'info?id=',
  ingredient: '?i=',
  category: '?c=',
  country: '?a=',
}
const mealsInstance = axios.create({
  baseURL: 'http://localhost:8080/'
})

export { routes, mealsInstance }
