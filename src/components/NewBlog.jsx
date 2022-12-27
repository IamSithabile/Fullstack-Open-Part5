import React, { useState } from 'react'

const NewBlog = ({ addBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const authorHandler = e => {
    const {
      target: { value },
    } = e
    setAuthor(value)
  }

  const titleHandler = e => {
    const {
      target: { value },
    } = e
    setTitle(value)
  }

  const urlHandler = e => {
    const {
      target: { value },
    } = e
    setUrl(value)
  }

  const formSubmitHandler = e => {
    e.preventDefault()

    const blog = { ...{ title, author, url } }
    addBlog(blog)

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={formSubmitHandler}>
        <label>
          Title :
          <input
            type="text"
            name="title"
            value={title}
            onChange={titleHandler}
            placeholder="Enter the blog title"
            id="title"
          />
        </label>
        <label>
          Author :
          <input
            type="text"
            name="author"
            value={author}
            onChange={authorHandler}
            placeholder="Enter the blog author"
            id="author"
          />
        </label>
        <label>
          Url :
          <input
            type="text"
            name="url"
            value={url}
            onChange={urlHandler}
            placeholder="Enter the blog url"
            id="url"
          />
        </label>
        <button
          type="submit"
          id="create-button"
        >
          Create
        </button>
      </form>
    </>
  )
}

export default NewBlog
