import { useMutation, useQueryClient } from '@tanstack/react-query'
import useQueryData from './useQueryData'
import blogService from '../services/blogs'
import { useSelector } from 'react-redux'

const useBlogMutation = () => {
  const token = useSelector((state) => state.userSession.token)
  const { appendQueryData, updateQueryData, deleteQueryData } = useQueryData([
    'blogs',
  ])

  const createMutation = useMutation({
    mutationFn: async (blog) => {
      return await blogService.createBlog(blog, token)
    },
    onSuccess: appendQueryData,
  })

  const likeMutation = useMutation({
    mutationFn: async (blogToUpdate) => {
      const comments = blogToUpdate.comments.map((comment) => comment.id) //de-populate comments
      return await blogService.updateBlog(blogToUpdate.id, {
        ...blogToUpdate,
        comments,
      })
    },
    onSuccess: updateQueryData,
  })

  const deleteMutation = useMutation({
    mutationFn: async (blog) => await blogService.deleteBlog(blog.id, token),
    onSuccess: deleteQueryData,
  })

  return { createMutation, likeMutation, deleteMutation }
}

export default useBlogMutation
