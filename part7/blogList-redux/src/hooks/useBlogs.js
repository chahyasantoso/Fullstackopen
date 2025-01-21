import { createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCommentToBlog,
  createBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog,
} from '../reducers/blogsReducer'

const blogsSelector = createSelector(
  (state) => state.blogs, //input; akan memonitor state ini, jika berubah
  (blogs) => [...blogs].sort((a, b) => b.likes - a.likes) //output; maka output akan dijalankan
)

export const useBlogs = () => {
  const blogs = useSelector(blogsSelector)
  return blogs
}

const blogSelector = createSelector(
  (state) => state.blogs, // input1 => blogs
  (state, id) => id, // input2 => id
  (blogs, id) => blogs.find((blog) => blog.id === id) //output
)

export const useBlog = (blogId) => {
  const blog = useSelector((state) => blogSelector(state, blogId))
  return blog
}

export const useBlogDispatch = () => {
  const dispatch = useDispatch()

  const initialize = async () => {
    await dispatch(initializeBlogs())
  }

  const create = async (blog) => {
    await dispatch(createBlog(blog))
  }

  const like = async (blog) => {
    await dispatch(likeBlog(blog))
  }

  const remove = async (blog) => {
    await dispatch(deleteBlog(blog))
  }

  const addComment = async (blog, comment) => {
    await dispatch(addCommentToBlog(blog, comment))
  }

  return {
    initialize,
    create,
    like,
    remove,
    addComment,
  }
}
