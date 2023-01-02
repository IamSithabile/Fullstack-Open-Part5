import { Link, Routes, Route, Navigate, useMatch } from 'react-router'

import Login from './components/Login'
import Homepage from './components/Homepage'
import { useSelector } from 'react-redux'
import User from './components/User'

const App = () => {
  const reduxUser = useSelector(state => state.user)

  const match = useMatch('users/:id')
  const id = match ? match.params.id : ''

  return (
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
    </Routes>
  )
}

export default App
