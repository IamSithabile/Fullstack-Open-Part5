import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Blog from './Blog';
import { initializeBlogs } from '../reducers/blogsReducer';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <div>
      <h2 className="my-4 mt-24 text-center text-3xl font-bold uppercase">
        Blogs
      </h2>
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
