import React, { useRef } from 'react';

import BlogList from './BlogList';
import NewBlog from './NewBlog';
import Notification from './Notification';
import Toggable from './Toggable';
import UsersInfo from './UsersInfo';

const Homepage = () => {
  const blogFormRef = useRef();

  return (
    <div className="p-10">
      <Notification />

      <UsersInfo />

      <Toggable label="Create new blog" ref={blogFormRef}>
        <NewBlog />
      </Toggable>

      <BlogList />
    </div>
  );
};

export default Homepage;
