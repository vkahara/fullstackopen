import { useState } from "react"

const Blog = ({ blog, like }) => {

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
  
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
     
      <div style={showWhenVisible}>
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
      </div>
    </div>  
  )
}

export default Blog