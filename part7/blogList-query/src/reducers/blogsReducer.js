import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const slice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload
      return blogs
    },
    addToState(state, action) {
      const blogToAdd = action.payload
      return [...state, blogToAdd]
    },
    updateToState(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    deleteFromState(state, action) {
      const blogToDelete = action.payload
      return state.filter((blog) => blog.id !== blogToDelete.id)
    },
  },
})

export const { setBlogs, addToState, updateToState, deleteFromState } =
  slice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch, getState) => {
    const token = getState().userSession.token
    const newBlog = await blogService.createBlog(blog, token)
    dispatch(addToState(newBlog))
    dispatch(
      setNotification({
        text: `a new blog ${newBlog.title} by ${newBlog.author}`,
      })
    )
  }
}

export const likeBlog = (blog) => {
  return async (dispatch, getState) => {
    const blogWithIncrementLike = {
      ...blog,
      likes: blog.likes + 1,
      comments: [...blog.comments.map((comment) => comment.id)], //de-populate the comments
    }
    const updatedBlog = await blogService.updateBlog(
      blog.id,
      blogWithIncrementLike
    )
    dispatch(updateToState(updatedBlog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch, getState) => {
    const token = getState().userSession.token
    const deletedBlog = await blogService.deleteBlog(blog.id, token)
    dispatch(deleteFromState(deletedBlog))
    dispatch(setNotification({ text: `blog deleted` }))
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch, getState) => {
    const newComment = await blogService.addComment(blog.id, comment)
    const updatedBlog = { ...blog, comments: [...blog.comments, newComment] }
    console.log('add comment', updatedBlog)
    dispatch(updateToState(updatedBlog))
  }
}

const blogsReducer = slice.reducer
export default blogsReducer
