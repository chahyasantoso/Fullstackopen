import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export default { getAll, create }