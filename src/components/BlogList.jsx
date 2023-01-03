import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Blog from './Blog';
import { initializeBlogs } from '../reducers/blogsReducer';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          //   {...{ updateBlog, removeBlog, user }}
        />
      ))}
    </div>
  );
};

export default BlogList;
