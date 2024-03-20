import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      const message = `anecdote '${data.content}' created`
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: message
      })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    },
    onError: (error) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: error.response.data.error
      })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    }
    
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'too short anecdote, must have length 5 or more'
      })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
      return
    }

    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    
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
