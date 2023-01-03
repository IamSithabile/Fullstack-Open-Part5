import { Routes, Route, Navigate, useMatch } from 'react-router'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Login from './components/Login'
import Homepage from './components/Homepage'
import User from './components/User'
import BlogItem from './components/BlogItem'
import Logout from './components/Logout'

const App = () => {
  const reduxUser = useSelector(state => state.user)

  const userMatch = useMatch('users/:id')
  const id = userMatch ? userMatch.params.id : ''

  const match = useMatch('blogs/:id')
  const blogId = match ? match.params.id : ''
  const navStyle = {
    backgroundColor: 'gray',
    display: 'flex',
    alignItems: 'center',
  }
  return (
    <>
      <div style={navStyle}>
        <Link to="/users">Users</Link>
        <Link to="/blogs">Blogs</Link>
        <Logout />
      </div>
      <br />
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              replace
              to={'/users'}
            />
          }
        />
        <Route
          path="/users"
          element={reduxUser ? <Homepage /> : <Login />}
        />
        <Route
          path="/users/:id"
          element={<User {...{ id }} />}
        />
        <Route
          path="/blogs/:id"
          element={<BlogItem {...{ blogId }} />}
        />
      </Routes>
    </>
  )
}

export default App
