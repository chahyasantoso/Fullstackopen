import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
      return ''
    }
  }
})

export const { setNotification, resetNotification } = slice.actions
export default slice.reducer