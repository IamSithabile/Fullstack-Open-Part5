import React from 'react'

import PropTypes from 'prop-types'

const LoginForm = ({
  formHandler,
  username,
  usernameHandler,
  password,
  passwordHandler,
}) => {
  return (
    <>
      <form onSubmit={formHandler}>
        <label>
          Username:{' '}
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

LoginForm.propTypes = {
  formHandler: PropTypes.func.isRequired,
  usernameHandler: PropTypes.func.isRequired,
  passwordHandler: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
