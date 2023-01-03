import React, { useEffect } from 'react'
import { fetchBlog } from '../reducers/blogReducer'

import { useDispatch, useSelector } from 'react-redux'
import { updateBlog } from '../reducers/blogsReducer'
import CommentInput from './CommentInput'

const BlogItem = ({ blogId }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBlog(blogId))
  }, [])

  useEffect

  const blog = useSelector(state => state.blog)

  if (!blog) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>{blog.title}</h1>

      <a>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button
          onClick={() => {
            dispatch(updateBlog(blogId, blog))
          }}
          id="like"
        >
          like
        </button>
      </p>
      <p>added by {blog.author}</p>

      {blog.comments && (
        <>
          <h2>Comments</h2>
          <CommentInput id={blogId} />
          <ul>
            {blog.comments.map(comment => (
              <li key={comment._id}>{comment.comment}</li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default BlogItem
