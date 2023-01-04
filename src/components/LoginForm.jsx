import React from 'react';

import { useState } from 'react';
import { loginUser } from '../reducers/userReducer';

import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const userDetails = { username, password };

    dispatch(loginUser(userDetails));

    setUsername('');
    setPassword('');
  };
  return (
    <>
      <form
        className="my-4 mx-auto max-w-3xl rounded bg-white px-8 py-10 shadow-xl"
        onSubmit={formHandler}
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-start text-2xl font-bold text-gray-700"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className="focus:shadow-outline bg-light-blue-200 w-full rounded-lg bg-blue-200 py-6 px-3 leading-tight text-gray-700 placeholder-gray-700 focus:outline-none"
            type="text"
            name="username"
            value={username}
            onChange={usernameHandler}
            placeholder="Enter your username"
            id="username"
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-start text-2xl font-bold text-gray-700"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="focus:shadow-outline w-full  rounded-lg bg-blue-200  py-6 px-3 leading-tight text-gray-700 placeholder-gray-700 focus:outline-none"
            type="password"
            name="password"
            value={password}
            onChange={passwordHandler}
            placeholder="Enter your password"
            id="password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded-full  bg-blue-500 py-3 px-6 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
            id="login-button"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
