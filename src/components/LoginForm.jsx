import React from "react";

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
          Username:{" "}
          <input
            type="text"
            name="username"
            value={username}
            onChange={usernameHandler}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={password}
            onChange={passwordHandler}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
