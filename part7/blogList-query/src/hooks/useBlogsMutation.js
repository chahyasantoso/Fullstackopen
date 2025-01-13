import { useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import useAuth from './useAuth'
import useBlogsQueryClient from './useBlogsQueryClient'
import useUsersQueryClient from './useUsersQueryClient'

const useBlogsMutation = () => {
  const token = useAuth().userSession?.token
  const { appendBlog, updateBlog, deleteBlog } = useBlogsQueryClient()
  const { appendUserBlog, updateUserBlog, deleteUserBlog } =
    useUsersQueryClient()

  const createMutation = useMutation({
    mutationFn: async (blog) => await blogService.createBlog(blog, token),
    onSuccess: (newBlog) => {
      appendBlog(newBlog)
      appendUserBlog(newBlog)
    },
  })

  const likeMutation = useMutation({
    mutationFn: async (blog) => {
      const likes = blog.likes + 1
      const comments = blog.comments.map((comment) => comment.id) //de-populate comments
      const blogWithIncrementLikes = {
        ...blog,
        likes,
        comments,
      }
      return await blogService.updateBlog(blog.id, blogWithIncrementLikes)
    },
    onSuccess: (blogWithIncrementLikes) => {
      updateBlog(blogWithIncrementLikes)
      updateUserBlog(blogWithIncrementLikes)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (blog) => {
      await blogService.deleteBlog(blog.id, token) // not really using delete response result
      return blog
    },
    onSuccess: (deletedBlog) => {
      deleteBlog(deletedBlog)
      deleteUserBlog(deletedBlog)
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: async ({ blog, comment }) => {
      const newComment = await blogService.addComment(blog.id, comment)
      const comments = [...blog.comments, newComment]
      const blogWithNewComment = {
        ...blog,
        comments,
      }
      return blogWithNewComment
    },
    onSuccess: (blogWithNewComment) => {
      updateBlog(blogWithNewComment)
      updateUserBlog(blogWithNewComment)
    },
  })

  return { createMutation, likeMutation, deleteMutation, addCommentMutation }
}

export default useBlogsMutation
