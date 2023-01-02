import { createSlice } from '@reduxjs/toolkit'

import { getAll } from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      console.log(action)
      return action.payload
    },
  },
})

export const { setBlogs } = blogsSlice.actions

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

export default blogsSlice.reducer
