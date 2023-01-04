import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { addBlog } from '../reducers/blogsReducer';

const NewBlog = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const authorHandler = (e) => {
    const {
      target: { value },
    } = e;
    setAuthor(value);
  };

  const titleHandler = (e) => {
    const {
      target: { value },
    } = e;
    setTitle(value);
  };

  const urlHandler = (e) => {
    const {
      target: { value },
    } = e;
    setUrl(value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const blog = { ...{ title, author, url } };
    dispatch(addBlog(blog, user.token));

    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <>
      <h2 className="mb-10 text-center text-3xl font-bold uppercase">
        Create new
      </h2>
      <form
        className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-lg"
        onSubmit={formSubmitHandler}
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-2xl font-bold text-gray-700"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className="focus:shadow-outline w-full rounded bg-blue-200 py-4 px-6 leading-tight text-gray-700 placeholder-gray-700 focus:outline-none"
            type="text"
            name="title"
            value={title}
            onChange={titleHandler}
            placeholder="Enter the blog title"
            id="title"
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-2xl font-bold text-gray-700"
            htmlFor="author"
          >
            Author:
          </label>
          <input
            className="focus:shadow-outline w-full rounded bg-blue-200 py-4 px-6 leading-tight text-gray-700 placeholder-gray-700 focus:outline-none"
            type="text"
            name="author"
            value={author}
            onChange={authorHandler}
            placeholder="Enter the blog author"
            id="author"
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-2xl font-bold text-gray-700"
            htmlFor="url"
          >
            Url:
          </label>
          <input
            className="focus:shadow-outline w-full rounded bg-blue-200 py-4 px-6 leading-tight text-gray-700 placeholder-gray-700 focus:outline-none"
            type="text"
            name="url"
            value={url}
            onChange={urlHandler}
            placeholder="Enter the blog url"
            id="url"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded-full  bg-blue-500 py-4 px-6 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
            id="create-button"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default NewBlog;
