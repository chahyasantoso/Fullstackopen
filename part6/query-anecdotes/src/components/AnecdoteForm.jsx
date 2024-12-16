import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../services/anecdotes'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      //queryClient.invalidateQueries('anecdotes')
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
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
