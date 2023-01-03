import React from 'react';
import LoginForm from './LoginForm';
import Toggable from './Toggable';

const Login = () => {
  return (
    <>
      <div>
        <h2>Log in to application</h2>
        <Toggable label="Login">
          <LoginForm />
        </Toggable>
      </div>
    </>
  );
};

export default Login;
