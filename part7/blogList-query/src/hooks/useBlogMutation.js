import { useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'
import UserSessionContext from '../contexts/UserSessionContext'
import useBlogsQuery from './useBlogsQuery'

const useBlogMutation = () => {
  const token = useContext(UserSessionContext).userSession?.token
  const { appendBlog, updateBlog, deleteBlog } = useBlogsQuery()
  const { setNotification } = useContext(NotificationContext)

  const createMutation = useMutation({
    mutationFn: async (blog) => {
      return await blogService.createBlog(blog, token)
    },
    onSuccess: (newBlog) => {
      appendBlog(newBlog)
      setNotification({
        text: `a new blog ${newBlog.title} by ${newBlog.author}`,
      })
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
    onSuccess: (updatedBlog) => {
      updateBlog(updatedBlog.id, updatedBlog)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (blog) => await blogService.deleteBlog(blog.id, token),
    onSuccess: (deletedBlog) => {
      deleteBlog(deletedBlog)
      setNotification({ text: `blog deleted` })
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: async ({ blog, comment }) => {
      const newComment = await blogService.addComment(blog.id, comment)
      const comments = [...blog.comments, newComment]
      return { ...blog, comments }
    },
    onSuccess: (blogWithNewComment) => {
      updateBlog(blogWithNewComment.id, blogWithNewComment)
    },
  })

  return { createMutation, likeMutation, deleteMutation, addCommentMutation }
}

export default useBlogMutation
