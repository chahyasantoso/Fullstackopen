import { useQueryClient } from '@tanstack/react-query'

// penting: jangan set querydata kalau queryKey tidak ada
// karena useQuery nggak mau background fetch karena menganggap
// data ada di cache (asumsi staleTime = Infinity)

const useUsersQueryClient = () => {
  const queryKey = ['users']
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(queryKey)

  const appendUserBlog = (newBlog) => {
    const userId = newBlog.user.id
    const usersAfter = users?.map((user) => {
      const isUserId = user.id === userId
      const blogs = isUserId ? [...user.blogs, newBlog] : user.blogs
      return { ...user, blogs }
    })
    queryClient.setQueryData(queryKey, usersAfter)
  }

  const updateUserBlog = (blogToUpdate) => {
    const userId = blogToUpdate.user.id
    const blogId = blogToUpdate.id
    const usersAfter = users?.map((user) => {
      const isUserId = user.id === userId
      const blogs = isUserId
        ? user.blogs.map((blog) => (blog.id === blogId ? blogToUpdate : blog))
        : user.blogs
      return { ...user, blogs }
    })
    queryClient.setQueryData(queryKey, usersAfter)
  }

  const deleteUserBlog = (blogToDelete) => {
    const userId = blogToDelete.user.id
    const blogId = blogToDelete.id
    const usersAfter = users?.map((user) => {
      const isUserId = user.id === userId
      const blogs = isUserId
        ? user.blogs.filter((blog) => blog.id !== blogId)
        : user.blogs
      return { ...user, blogs }
    })
    queryClient.setQueryData(queryKey, usersAfter)
  }

  return {
    appendUserBlog,
    updateUserBlog,
    deleteUserBlog,
  }
}

export default useUsersQueryClient
