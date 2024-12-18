import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll, update } from './services/anecdotes'
import { useContext } from 'react'
import NotificationContext, { resetNotification, setNotification } from './contexts/notificationContext'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false,
  })

  const queryClient = useQueryClient()
  const voteMutation = useMutation({
    mutationFn: update,
    onSuccess: (udpatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const anecdotesAfter = anecdotes.map((anecdote) => {
        if (anecdote.id === udpatedAnecdote.id) {
          return udpatedAnecdote
        }
        return anecdote
      })
      queryClient.setQueryData(['anecdotes'], anecdotesAfter)
    }
  })



  if (result.isError) {
    return (
      <h2>
        anecdote service is not available due to problems is server
      </h2>
    )
  }

  const anecdotes = result.isSuccess ? result.data : []

  const handleVote = (anecdote) => {
    const udpatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    voteMutation.mutate({ id: anecdote.id, anecdote: udpatedAnecdote })
    dispatch(setNotification(`voted ${udpatedAnecdote.content}`))
    setTimeout(() => dispatch(resetNotification()), 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
