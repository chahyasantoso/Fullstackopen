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

const update = async (blog) => {
  const { user, ...blogToUpdate } = blog
  const response = await axios.put(`${baseUrl}/${blog.id}`, blogToUpdate)
  return response.data
}

export default { getAll, create, update }