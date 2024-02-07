import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(
          `Added new blog ${returnedBlog.title} by ${returnedBlog.author}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorMessage('Error adding new blog')
        console.log("error",error);
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)

    } catch (exception) {
      console.log('error', exception)
    }
  }
  
  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
          <div>
            username
            <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={ handleLogout }>logout</button>
      </p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
      {user === null && loginForm()}
      {user !== null && showBlogs()}
      
      
    </div>
  )
}

export default App