import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterChange(state, action) {
      return action.payload.toLowerCase()
    }
  }
})

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload.toLowerCase()

//     default:
//       return state
//   }
// }

// export const filterChange = (filter) => ({ type: 'SET_FILTER', payload: filter })

export const { filterChange } = slice.actions
export default slice.reducer