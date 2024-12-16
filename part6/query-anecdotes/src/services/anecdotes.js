import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

export const create = async (content) => {
  const result = await axios.post(
    baseUrl,
    { content, votes: 0 }
  )
  return result.data
}

export const update = async ({ id, anecdote }) => {
  const result = await axios.put(
    `${baseUrl}/${id}`,
    anecdote
  )
  return result.data
}


