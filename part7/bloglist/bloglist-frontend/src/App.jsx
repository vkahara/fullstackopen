import { useState, useEffect, useRef, useReducer } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom'
import { Table, Navbar, Nav, Container, Button } from 'react-bootstrap'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './views/Users'
import User from './views/User'
import {
  notificationReducer,
  notificationInitialState,
} from './reducers/notificationReducer'
import NotificationContext from './NotificationContext'
import { userInitialState, userReducer } from './reducers/userReducer'
import UserContext from './UserContext'
import BlogDetail from './views/BlogDetail'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userState, userDispatch] = useReducer(userReducer, userInitialState)
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

  const likeBlogMutation = useMutation({
    mutationFn: blogToLike => blogService.like(blogToLike),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogToRemove => blogService.remove(blogToRemove),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
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
      userDispatch({ type: 'SET_USER', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async blogObject => {
    const blogWithUserInfo = {
      ...blogObject,
      user: {
        username: userState.username,
        name: userState.name,
        id: userState.id,
      },
    }

    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(blogWithUserInfo)
  }

  const likeBlog = blogToLike => {
    likeBlogMutation.mutate(blogToLike)
  }

  const removeBlog = blogToRemove => {
    removeBlogMutation.mutate(blogToRemove)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      userDispatch({ type: 'SET_USER', payload: user })
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

  const LogoutButton = () => {
    const navigate = useNavigate()

    const handleLogout = async event => {
      event.preventDefault()
      window.localStorage.removeItem('loggedBlogappUser')
      userDispatch({ type: 'CLEAR_USER' })
      navigate('/')
    }
    return (
      <Button variant='warning' onClick={handleLogout}>
        logout
      </Button>
    )
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
        {blogForm()}
        <Table striped bordered hover variant='dark'>
          <thead></thead>
          <tbody>
            {sortedBlogs.map(blog => (
              <tr key={blog.id}>
                <Blog
                  key={blog.id}
                  blog={blog}
                  like={likeBlog}
                  user={userState.user}
                  remove={removeBlog}
                />
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }

  if (isLoading) {
    return <div>loading data...</div>
  }
  const Home = () => (
    <NotificationContext.Provider
      value={{ notificationState, notificationDispatch }}
    >
      <UserContext.Provider value={{ userState, userDispatch }}>
        <div>
          <Notification />
          <ErrorNotification />
          {userState.user !== null && showBlogs()}
        </div>
      </UserContext.Provider>
    </NotificationContext.Provider>
  )

  return (
    <div className='container'>
      <Router>
        <div>
          {userState.user ? (
            <Navbar bg='dark' data-bs-theme='dark'>
              <Container>
                <Nav className='me-auto'>
                  <Link to='/' className='nav-link'>
                    blogs{' '}
                  </Link>
                  <Link to='/users' className='nav-link'>
                    users{' '}
                  </Link>
                </Nav>
                <Navbar.Collapse className='justify-content-end'>
                  <Navbar.Text>{userState.user.name} logged in </Navbar.Text>
                  <LogoutButton />
                </Navbar.Collapse>
              </Container>
            </Navbar>
          ) : (
            loginForm()
          )}
        </div>

        <Routes>
          <Route
            path='blogs/:id'
            element={<BlogDetail user={userState.user} />}
          />
          <Route path='users/:id' element={<User />} />
          <Route path='/users' element={<Users />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
