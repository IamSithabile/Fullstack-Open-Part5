import React from 'react'

import { useState } from 'react'
import { loginUser } from '../reducers/userReducer'

import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const usernameHandler = e => {
    setUsername(e.target.value)
  }

  const passwordHandler = e => {
    setPassword(e.target.value)
  }

  const formHandler = e => {
    e.preventDefault()

    const userDetails = { username, password }

    dispatch(loginUser(userDetails))

    setUsername('')
    setPassword('')
  }
  return (
    <>
      <form onSubmit={formHandler}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={usernameHandler}
            id="username"
          />
        </label>
        <label>
          Password:{' '}
          <input
            type="password"
            name="password"
            value={password}
            onChange={passwordHandler}
            id="password"
          />
        </label>

        <button
          type="submit"
          id="login-button"
        >
          Login
        </button>
      </form>
    </>
  )
}

export default LoginForm
