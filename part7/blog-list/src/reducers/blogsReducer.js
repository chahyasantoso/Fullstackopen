import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
      return state.map((s) => {
        if (s.id === updatedBlog.id) {
          return updatedBlog
        }
        return s
      })
    },
    deleteFromState(state, action) {
      const blogToDelete = action.payload
      return state.filter((s) => {
        return s.id !== blogToDelete.id
      })
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
    const token = getState().user.token
    const newBlog = await blogService.createBlog(blog, token)
    dispatch(addToState(newBlog))
    return newBlog
  }
}

export const likeBlog = (blog) => {
  return async (dispatch, getState) => {
    const blogWithIncrementLike = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.updateBlog(
      blog.id,
      blogWithIncrementLike
    )
    dispatch(updateToState(updatedBlog))
    return updatedBlog
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch, getState) => {
    const token = getState().user.token
    const deletedBlog = await blogService.deleteBlog(blog.id, token)
    dispatch(deleteFromState(deletedBlog))
    return deleteBlog
  }
}

const blogsReducer = slice.reducer
export default blogsReducer
