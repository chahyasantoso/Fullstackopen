import { createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import {
  addCommentToBlog,
  createBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog,
} from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

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
    try {
      await dispatch(initializeBlogs())
    } catch {}
  }

  const create = async (blog) => {
    try {
      await dispatch(createBlog(blog))
      dispatch(
        setNotification({
          text: `a new blog ${blog.title} by ${blog.author}`,
        })
      )
    } catch {}
  }

  const like = async (blog) => {
    try {
      await dispatch(likeBlog(blog))
    } catch {}
  }

  const remove = async (blog) => {
    try {
      await dispatch(deleteBlog(blog))
      dispatch(setNotification({ text: `blog deleted` }))
    } catch {}
  }

  const addComment = async (blog, comment) => {
    try {
      await dispatch(addCommentToBlog(blog, comment))
    } catch {}
  }

  return {
    initialize,
    create,
    like,
    remove,
    addComment,
  }
}
