import { useState } from 'react'

const Blog = ({ blog, like, user, remove }) => {

  const [visible, setVisible] = useState(false)
  const [addLikes, setAddLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeAction = () => {
    const newLikes = addLikes + 1
    setAddLikes(newLikes)
    like({
      ...blog,
      likes: newLikes
    })
  }

  const deleteAction = () => {

    const isConfirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (!isConfirmed) {
      return
    }
    remove(blog.id)
  }

  const deleteButton = () => (
    <div>
      <button onClick={deleteAction}>remove</button>
    </div>
  )

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible} className='togglableContent'>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={likeAction}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>
          {user.id === blog.user.id && deleteButton()}
        </div>
      </div>
    </div>
  )
}

export default Blog