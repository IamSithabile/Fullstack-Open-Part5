import React from 'react';
import LoginForm from './LoginForm';
import Toggable from './Toggable';

const Login = () => {
  return (
    <>
      <div className="flex items-center space-x-4">
        <div className=" w-1/2">
          <img
            src="https://images.unsplash.com/photo-1510442650500-93217e634e4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=691&q=80"
            alt="type writer"
            className=" h-screen "
          />
        </div>
        <div className=" w-full justify-center  text-center">
          <h1 className="py-10 text-3xl font-bold uppercase">
            Log in to application
          </h1>
          <Toggable label="Login">
            <LoginForm />
          </Toggable>
        </div>
      </div>
    </>
  );
};

export default Login;
