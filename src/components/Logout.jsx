import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';

const Logout = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const logoutHandler = async () => {
    dispatch(logoutUser());
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="flex flex-row items-center">
        <p>{user.username} logged in</p>
        <button
          className="focus:shadow-outline ml-8 rounded-full bg-red-500 py-3 px-6 font-bold text-white hover:bg-red-700 focus:outline-none"
          onClick={logoutHandler}
          id="logout-button"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
