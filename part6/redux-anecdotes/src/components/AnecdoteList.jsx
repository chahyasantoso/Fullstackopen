import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const filteredAnecdotes = state.anecdotes.filter(({ content }) => content.toLowerCase().includes(state.filter))
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = ({ id, content }) => {
    dispatch(incrementVote(id))
    dispatch(setNotification(`you voted ${content}`))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList