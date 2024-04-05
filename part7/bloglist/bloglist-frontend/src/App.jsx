import { useState, useEffect, useRef, useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import {
  notificationReducer,
  notificationInitialState,
} from './reducers/notificationReducer'
import NotificationContext from './NotificationContext'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationState, notificationDispatch] = useReducer(
    notificationReducer,
    notificationInitialState
  )

  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogWithUserInfo => blogService.create(blogWithUserInfo),
    onSuccess: returnedBlog => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({
        type: 'SET_MESSAGE',
        payload: `Added new blog ${returnedBlog.title} by ${returnedBlog.author}`,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_MESSAGE' })
      }, 3000)
    },
    onError: () => {
      notificationDispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: 'Error adding new blog',
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_ERROR_MESSAGE' })
      }, 3000)
    },
  })

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async blogObject => {
    const blogWithUserInfo = {
      ...blogObject,
      user: { username: user.username, name: user.name, id: user.id },
    }

    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(blogWithUserInfo)
  }

  /*
  const likeBlog = updateObject => {
    blogService.like(updateObject).then(returnedBlog => {
      setBlogs(
        blogs.map(blog => (blog.id === returnedBlog.id ? returnedBlog : blog))
      )
    })
  }

  const removeBlog = removeId => {
    blogService.remove(removeId).then(() => {
      const updatedBlogs = blogs.filter(blog => blog.id !== removeId)
      setBlogs(updatedBlogs)
    })
  }
*/
  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationDispatch({
        type: 'SET_ERROR_MESSAGE',
        payload: 'Wrong username or password',
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_ERROR_MESSAGE' })
      }, 3000)
    }
  }

  const handleLogout = async event => {
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
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>
          login
        </button>
      </form>
    </div>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const sortBlogsByLikes = blogs => {
    return blogs.slice().sort((a, b) => b.likes - a.likes)
  }

  const showBlogs = () => {
    const sortedBlogs = sortBlogsByLikes(blogs)
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        {blogForm()}
        {sortedBlogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            //like={likeBlog}
            user={user}
            //remove={removeBlog}
          />
        ))}
      </div>
    )
  }

  if (isLoading) {
    return <div>loading data...</div>
  }

  return (
    <NotificationContext.Provider
      value={{ notificationState, notificationDispatch }}
    >
      <div>
        <Notification />
        <ErrorNotification />
        {user === null && loginForm()}
        {user !== null && showBlogs()}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
