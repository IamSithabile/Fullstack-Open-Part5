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
      <div style={{ display: 'flex' }}>
        <p>{user.username} logged in</p>
        <button onClick={logoutHandler} id="logout-button">
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
