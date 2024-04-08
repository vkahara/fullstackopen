import PropTypes from 'prop-types'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={event => addBlog(event, newTitle, newAuthor, newUrl)}>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Control
            placeholder='title'
            data-testid='title-input'
            type='text'
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='author'>
          <Form.Control
            placeholder='author'
            data-testid='author-input'
            type='text'
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='url'>
          <Form.Control
            placeholder='url'
            data-testid='url-input'
            type='text'
            value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
          />
        </Form.Group>

        <Button variant='primary' id='create' type='submit'>
          create
        </Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
