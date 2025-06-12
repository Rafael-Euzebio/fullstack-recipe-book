import axios from 'axios'

const mealsInstance = axios.create({
  baseURL: 'http://localhost:8080/'
})

export default mealsInstance
