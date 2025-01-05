import { useQuery, useQueryClient } from '@tanstack/react-query'
import useUsersQuery from './useUsersQuery'
import blogService from '../services/blogs'

const useBlogsQuery = () => {
  const queryKey = ['blogs']

  const { data } = useQuery({
    queryKey,
    queryFn: blogService.getAll,
    staleTime: Infinity,
  })
  const queryClient = useQueryClient()
  const blogs = data ? [...data].sort((a, b) => b.likes - a.likes) : []

  const { appendUserBlog, updateUserBlog, deleteUserBlog } = useUsersQuery()

  const blogById = (id) => {
    return blogs.find((blog) => blog.id === id)
  }

  const appendBlog = (newBlog) => {
    const blogsAfter = [...blogs, newBlog]
    queryClient.setQueryData(queryKey, blogsAfter)
    appendUserBlog(newBlog)
  }

  const updateBlog = (blogId, updatedBlog) => {
    const blogsAfter = blogs.map((blog) =>
      blog.id === blogId ? updatedBlog : blog
    )
    queryClient.setQueryData(queryKey, blogsAfter)
    updateUserBlog(updatedBlog.user.id, updatedBlog)
  }

  const deleteBlog = (deletedBlog) => {
    const blogsAfter = blogs.filter((blog) => blog.id !== deletedBlog.id)
    queryClient.setQueryData(queryKey, blogsAfter)
    deleteUserBlog(deletedBlog.user.id, deletedBlog)
  }

  return {
    blogs,
    blogById,
    appendBlog,
    updateBlog,
    deleteBlog,
  }
}

export default useBlogsQuery
