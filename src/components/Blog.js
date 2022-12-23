import React, { useState } from "react";

const Blog = ({ blog }) => {
  const { title, url, author, likes } = blog;

  const [show, setShow] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!show) {
    return (
      <div style={blogStyle}>
        <p>{title}</p>
        <p>{author}</p>
        <button
          onClick={() => {
            setShow(true);
          }}
        >
          View
        </button>
      </div>
    );
  }
  return (
    <>
      <div style={blogStyle}>
        <p>{title}</p>
        <p>{url}</p>
        <p>
          {likes}
          <button>like</button>
        </p>
        <p>{author}</p>
      </div>
      <button
        onClick={() => {
          setShow(false);
        }}
      >
        Hide
      </button>
    </>
  );
};

export default Blog;
