import React, { useState } from "react";

import { create } from "../services/blogs";

const NewBlog = ({ token }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

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

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const blog = { ...{ title, author, url } };
    const request = await create(blog, token);
    console.log(request);

    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <label>
          Title :
          <input
            type="text"
            name="title"
            value={title}
            onChange={titleHandler}
          />
        </label>
        <label>
          Author :
          <input
            type="text"
            name="author"
            value={author}
            onChange={authorHandler}
          />
        </label>
        <label>
          Url :
          <input type="text" name="url" value={url} onChange={urlHandler} />
        </label>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default NewBlog;
