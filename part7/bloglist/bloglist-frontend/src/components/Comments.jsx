import blogService from '../services/blogs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ListGroup, ListGroupItem, Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={event => addComment(event)}>
        <Form.Group className='mb-3' controlId='comment'>
          <Form.Control
            placeholder='comment'
            value={newComment}
            onChange={event => setNewComment(event.target.value)}
          />
        </Form.Group>
        <Button type='submit'>add comment</Button>
      </Form>
      <br></br>
      <ListGroup>
        {comments.map((comment, index) => (
          <ListGroupItem variant='dark' key={index}>
            {comment}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  )
}

export default Comments
