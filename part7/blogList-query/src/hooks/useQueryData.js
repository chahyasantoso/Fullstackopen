import { useQueryClient } from '@tanstack/react-query'

const useQueryData = (queryKey) => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(queryKey)

  const appendQueryData = (newBlog) => {
    queryClient.setQueryData(queryKey, [...blogs, newBlog])
  }

  const updateQueryData = (updatedBlog) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    )
    queryClient.setQueryData(queryKey, updatedBlogs)
  }
  const deleteQueryData = (deletedBlog) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== deletedBlog.id)
    queryClient.setQueryData(queryKey, updatedBlogs)
  }
  return { appendQueryData, updateQueryData, deleteQueryData }
}

export default useQueryData
