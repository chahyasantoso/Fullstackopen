import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../services/anecdotes'
import { useContext } from 'react'
import NotificationContext, { resetNotification, setNotification } from '../contexts/notificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      //queryClient.invalidateQueries('anecdotes')
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote])
      dispatch(setNotification(`New anecdote ${newAnecdote.content}`))
      setTimeout(() => dispatch(resetNotification()), 5000)
    },
    onError: (error) => {
      if (error.response?.data?.error) {
        dispatch(setNotification(error.response?.data?.error))
        setTimeout(() => dispatch(resetNotification()), 5000)
      }

    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
