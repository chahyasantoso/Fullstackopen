import { useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import useAuth from './useAuth'

const useBlogsMutation = () => {
  const token = useAuth().userSession?.token

  const createMutation = useMutation({
    mutationFn: async (blog) => {
      return await blogService.createBlog(blog, token)
    },
  })

  const likeMutation = useMutation({
    mutationFn: async (blogToUpdate) => {
      const likes = blogToUpdate.likes + 1
      const comments = blogToUpdate.comments.map((comment) => comment.id) //de-populate comments
      return await blogService.updateBlog(blogToUpdate.id, {
        ...blogToUpdate,
        likes,
        comments,
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (blog) => await blogService.deleteBlog(blog.id, token),
  })

  const addCommentMutation = useMutation({
    mutationFn: async ({ blog, comment }) => {
      const newComment = await blogService.addComment(blog.id, comment)
      const comments = [...blog.comments, newComment]
      return { ...blog, comments }
    },
  })

  return { createMutation, likeMutation, deleteMutation, addCommentMutation }
}

export default useBlogsMutation
