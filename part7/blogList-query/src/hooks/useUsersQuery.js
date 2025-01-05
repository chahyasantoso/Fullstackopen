import { useQuery, useQueryClient } from '@tanstack/react-query'
import userService from '../services/users'

const useUsersQuery = () => {
  const queryKey = ['users']

  const { data } = useQuery({
    queryKey,
    queryFn: userService.getAll,
    staleTime: Infinity,
  })
  const queryClient = useQueryClient()
  const users = data ?? []

  const userById = (id) => {
    return users.find((user) => user.id === id)
  }

  const updateUser = (userId, updatedUser) => {
    const usersAfter = users.map((user) =>
      user.id === userId ? updatedUser : user
    )
    queryClient.setQueryData(queryKey, usersAfter)
  }

  const appendUserBlog = (blog) => {
    const user = userById(blog.user.id)
    user.blogs = [...user.blogs, blog]
    updateUser(blog.user.id, user)
  }

  const updateUserBlog = (userId, blog) => {
    const user = userById(userId)
    user.blogs = user.blogs.map((b) => (b.id === blog.id ? blog : b))
    updateUser(userId, user)
  }

  const deleteUserBlog = (userId, blog) => {
    const usersAfter = users.map((user) => {
      const blogs = user.blogs.filter((b) => b.id !== blog.id)
      return { ...user, blogs }
    })
    queryClient.setQueryData(queryKey, usersAfter)
  }

  return {
    users,
    userById,
    updateUser,
    appendUserBlog,
    updateUserBlog,
    deleteUserBlog,
  }
}

export default useUsersQuery
