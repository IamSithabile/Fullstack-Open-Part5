import { createSlice } from '@reduxjs/toolkit'

import { create, getAll, getOne, remove, update } from '../services/blogs'
import { displayNotification } from './notificationReducer'

const sortByLikes = (a, b) => {
  if (a.likes > b.likes) {
    return -1
  } else if (a.likes < b.likes) {
    return 1
  } else {
    return 0
  }
}

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      console.log(action)
      return action.payload
    },
    appendBlog(state, action) {
      console.log(action.payload)
      return [...state, action.payload]
    },
    updateBlogs(state, action) {
      const returnedBlog = action.payload
      const updatedBlogs = state.map(blog =>
        blog.id === returnedBlog.id ? { ...blog, likes: blog.likes + 1 } : blog
      )

      const sortedBlogs = [...updatedBlogs]
      sortedBlogs.sort(sortByLikes)

      return sortedBlogs
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
  },
})

export const { setBlogs, appendBlog, updateBlogs } = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const returnedBlogs = await getAll()

    const sortedBlogs = [...returnedBlogs]
    sortedBlogs.sort(sortByLikes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const addBlog = (newBlog, token) => {
  return async dispatch => {
    try {
      const returnedBlog = await create(newBlog, token)
      dispatch(appendBlog(returnedBlog))
      dispatch(
        displayNotification({
          info: `A new blog ${returnedBlog.title} by ${returnedBlog.author} has been added`,
        })
      )
    } catch (error) {
      dispatch(displayNotification({ className: 'error', info: error.message }))
    }
    //   blogFormRef.current.toggleVisible() remember to toggle visibility
  }
}

export const updateBlog = (id, blogToUpdate) => {
  return async dispatch => {
    let { title, url, author, likes } = blogToUpdate

    try {
      const updating = {
        title,
        url,
        author,
        likes: likes + 1,
      }
      const returnedBlog = await update(id, updating)

      dispatch(updateBlogs(returnedBlog))
      dispatch(
        displayNotification({ info: `blog with title '${title}' liked!` })
      )
    } catch (error) {
      dispatch(displayNotification({ className: 'error', info: error.message }))
    }
  }
}

export const removeBlog = (id, author, title) => {
  return async dispatch => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    const user = JSON.parse(loggedInUserJSON)

    await remove(id, user.token)
    dispatch(removeBlog(id))

    dispatch(displayNotification({ info: `${title} by ${author} removed!` }))
  }
}

export default blogsSlice.reducer
