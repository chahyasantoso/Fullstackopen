import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    if (content) {
      dispatch(create(content))
      dispatch(setNotification(`new anecdote ${content}`, 5000))
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='content' /></div>
        <button>create</button>
      </form>
    </>

  )
}

export default AnecdoteForm