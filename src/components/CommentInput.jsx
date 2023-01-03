import React, { useState } from 'react'
import { commentOnBlog } from '../reducers/blogReducer'

import { useDispatch } from 'react-redux'

function CommentInput({ id }) {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()

    dispatch(commentOnBlog(id, comment))
    setComment('')
  }

  const handleChange = event => {
    setComment(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">Comment:</label>
      <input
        type="text"
        id="comment"
        value={comment}
        onChange={handleChange}
      />
      <button type="submit">Add Comment</button>
    </form>
  )
}

export default CommentInput
