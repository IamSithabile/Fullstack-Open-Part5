import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../reducers/usersReducer';

const UsersInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const users = useSelector((state) => state.users);

  return (
    <div className="mt-40 mb-20 ">
      <h2 className="mb-10 text-center text-3xl font-bold uppercase">Users</h2>
      <ul>
        {users.map((user) => (
          <li className="  text-xl font-bold " key={user.id}>
            <Link to={`/users/${user.id}`}>
              {user.username} has
              {user.blogs.length} {user.blogs.length > 1 ? 'blogs' : 'blog'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersInfo;
