import { useEffect, useRef, useState } from 'react'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Toggable from './components/Toggable'

import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import { logoutUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const reduxUser = useSelector(state => state.user)

  useEffect(() => {
    const exists = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (exists) {
      setUser(exists)
    }
  }, [])

  useEffect(() => {
    if (reduxUser) {
      setUser(reduxUser)
    }
  }, [reduxUser])

  const blogFormRef = useRef()

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    dispatch(logoutUser())
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <Toggable label="Login">
          <LoginForm />
        </Toggable>
      </div>
    )
  }

  return (
    <div>
      <Notification />

      {user && (
        <div>
          <h2>User</h2>
          <p>{user.username} logged in</p>
          <button
            onClick={logoutHandler}
            id="logout-button"
          >
            Logout
          </button>
        </div>
      )}
      <br />
      <Toggable
        label="Create new blog"
        ref={blogFormRef}
      >
        <NewBlog />
      </Toggable>

      <h2>blogs</h2>
      <BlogList />
    </div>
  )
}

export default App
