import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      const users = action.payload
      return users
    },
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
