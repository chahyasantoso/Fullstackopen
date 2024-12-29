import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { addToState, deleteFromState, updateToState } from './blogsReducer'

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      const users = action.payload
      return users
    },
  },
  // users state tergantung terhadap blogs, maka pakai extra reducers
  extraReducers: (builder) => {
    // jika ada addToState maka isi users (bagian blog) juga harus ditambah
    builder.addCase(addToState, (state, action) => {
      const blog = action.payload
      return state.map((user) => {
        if (user.id === blog.user.id) {
          const blogs = [...user.blogs, blog]
          return { ...user, blogs }
        }
        return user
      })
    })
    // jika ada updateToState maka isi users (bagian blog) juga harus update
    builder.addCase(updateToState, (state, action) => {
      const blog = action.payload
      return state.map((user) => {
        const blogs = user.blogs.map((b) => (b.id === blog.id ? blog : b))
        return { ...user, blogs }
      })
    })
    // jika ada deleteFromState maka isi users (bagian blog) juga harus dikurang
    builder.addCase(deleteFromState, (state, action) => {
      const blog = action.payload
      return state.map((user) => {
        const blogs = user.blogs.filter((b) => b.id !== blog.id)
        return { ...user, blogs }
      })
    })
  },
})

export const { setUsers } = slice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

const usersReducer = slice.reducer
export default usersReducer
