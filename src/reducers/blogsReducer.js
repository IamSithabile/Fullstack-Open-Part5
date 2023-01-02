import { createSlice } from '@reduxjs/toolkit'

import { create, getAll } from '../services/blogs'

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
  },
})

export const { setBlogs, appendBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const returnedBlogs = await getAll()

    const sortByLikes = (a, b) => {
      if (a.likes > b.likes) {
        return -1
      } else if (a.likes < b.likes) {
        return 1
      } else {
        return 0
      }
    }

    const sortedBlogs = [...returnedBlogs]
    sortedBlogs.sort(sortByLikes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const addBlog = newBlog => {
  return async dispatch => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)

      const returnedBlog = await create(newBlog, user.token)
      dispatch(appendBlog(returnedBlog))
    }
    //   blogFormRef.current.toggleVisible() remember to toggle visibility
  }
}

export default blogsSlice.reducer
