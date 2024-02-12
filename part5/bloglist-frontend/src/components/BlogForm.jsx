import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
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
      <form onSubmit={(event) => addBlog(event, newTitle, newAuthor, newUrl)}>
        <div>title:<input data-testid="title-input" type='text' value={newTitle} onChange={(event) => setNewTitle(event.target.value)}/></div>
        <div>author:<input data-testid="author-input" type='text' value={newAuthor} onChange={(event) => setNewAuthor(event.target.value)}/></div>
        <div>url:<input data-testid="url-input" type='text' value={newUrl} onChange={(event) => setNewUrl(event.target.value)}/></div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm