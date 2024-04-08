import blogService from '../services/blogs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

const Comments = ({ id }) => {
  const [newComment, setNewComment] = useState('')
  const queryClient = useQueryClient()

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comment', id],
    queryFn: () => blogService.getComments(id),
  })

  if (isLoading) return <div>...loading</div>

  const addComment = async event => {
    event.preventDefault()
    console.log(newComment)
    await blogService.addComment(id, newComment)
    setNewComment('')
    queryClient.invalidateQueries(['comments', id])
  }

  return (
    <div>
      <h2>comments</h2>
      <form onSubmit={event => addComment(event)}>
        <input
          value={newComment}
          onChange={event => setNewComment(event.target.value)}
        />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
