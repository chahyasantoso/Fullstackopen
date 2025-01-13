import { useQueryClient } from '@tanstack/react-query'

const useBlogsQueryClient = () => {
  const queryKey = ['blogs']
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(queryKey)

  const appendBlog = (newBlog) => {
    const blogsAfter = blogs ? [...blogs, newBlog] : undefined
    queryClient.setQueryData(queryKey, blogsAfter)
  }

  const updateBlog = (blogToUpdate) => {
    const blogId = blogToUpdate.id
    const blogsAfter = blogs?.map((blog) =>
      blog.id === blogId ? blogToUpdate : blog
    )
    queryClient.setQueryData(queryKey, blogsAfter)
  }

  const deleteBlog = (blogToDelete) => {
    const blogId = blogToDelete.id
    const blogsAfter = blogs?.filter((blog) => blog.id !== blogId)
    queryClient.setQueryData(queryKey, blogsAfter)
  }

  return {
    appendBlog,
    updateBlog,
    deleteBlog,
  }
}

export default useBlogsQueryClient
