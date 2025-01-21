import { createSelector } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

export const useUsers = () => {
  const users = useSelector((state) => state.users)
  return users
}

const userSelector = createSelector(
  (state) => state.users, // input1 => users
  (state, id) => id, // input2 => id
  (users, id) => users.find((user) => user.id === id) //output berdasarkan input1 dan input2
)

export const useUser = (userId) => {
  const user = useSelector((state) => userSelector(state, userId))
  return user
}

export const useUserDispatch = () => {
  const dispatch = useDispatch()

  const initialize = async () => {
    await dispatch(initializeUsers())
  }

  return {
    initialize,
  }
}
