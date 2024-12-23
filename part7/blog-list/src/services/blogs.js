import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

const updateBlog = async (blogId, blog) => {
  const { user, ...blogToUpdate } = blog
  const response = await axios.put(`${baseUrl}/${blogId}`, blogToUpdate)
  return response.data
}

const deleteBlog = async (blogId, token) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export default { getAll, createBlog, updateBlog, deleteBlog }