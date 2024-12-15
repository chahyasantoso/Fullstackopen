import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const slice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    incrementVote(state, action) {
      const id = action.payload
      const stateAfterVote = state.map((anecdote) => {
        if (anecdote.id === id) {
          return { ...anecdote, votes: anecdote.votes + 1 }
        }
        return anecdote
      })
      return stateAfterVote
    },
    create(state, action) {
      const content = action.payload
      const stateAfterCreate = [...state, { content, id: getId(), votes: 0 }]
      return stateAfterCreate
    }
  }
})

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'INC_VOTE':
//       const id = action.payload
//       const stateAfterVote = state.map((anecdote) => {
//         if (anecdote.id === id) {
//           return { ...anecdote, votes: anecdote.votes + 1 }
//         }
//         return anecdote
//       })
//       return stateAfterVote

//     case 'CREATE':
//       const content = action.payload
//       const stateAfterCreate = [...state, { content, id: getId(), votes: 0 }]
//       return stateAfterCreate

//     default: return state
//   }

// }

// export const incrementVote = (id) => ({ type: 'INC_VOTE', payload: id })
// export const create = (content) => ({ type: 'CREATE', payload: content })

export const { incrementVote, create } = slice.actions
export default slice.reducer