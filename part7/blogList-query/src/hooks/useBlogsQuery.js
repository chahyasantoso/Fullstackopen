import { useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useMemo } from 'react'

const useBlogsQuery = () => {
  const queryKey = ['blogs']
  const { data } = useQuery({
    queryKey,
    queryFn: blogService.getAll,
    staleTime: Infinity,
  })
  const blogs = useMemo(
    () => (data ? [...data].sort((a, b) => b.likes - a.likes) : []),
    [data]
  )
  const queryClient = useQueryClient()

  const blogById = (id) => {
    return blogs.find((blog) => blog.id === id)
  }

  const appendBlog = (newBlog) => {
    const blogsAfter = [...blogs, newBlog]
    queryClient.setQueryData(queryKey, blogsAfter)
  }

  const updateBlog = (blogId, updatedBlog) => {
    const blogsAfter = blogs.map((blog) =>
      blog.id === blogId ? updatedBlog : blog
    )
    queryClient.setQueryData(queryKey, blogsAfter)
  }

  const deleteBlog = (deletedBlog) => {
    const blogsAfter = blogs.filter((blog) => blog.id !== deletedBlog.id)
    queryClient.setQueryData(queryKey, blogsAfter)
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
