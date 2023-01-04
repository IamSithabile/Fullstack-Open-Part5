import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
    }
  }, []);

  const { id, title, author } = blog;

  return (
    <div className="blogs my-6 rounded-2xl p-4 shadow-md shadow-gray-400 hover:shadow-gray-600">
      <Link className=" text-xl font-semibold" to={`/blogs/${id}`}>
        {title}
      </Link>
      <p className="italic">{author}</p>
    </div>
  );
};

export default Blog;
