import { createSlice } from '@reduxjs/toolkit'
import { getOne } from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: {},
  reducers: {
    setBlog(state, action) {
      return action.payload
    },
  },
})

export const { setBlog } = blogSlice.actions

export const fetchBlog = id => {
  return async dispatch => {
    console.log(id)
    const blog = await getOne(id)
    dispatch(setBlog(blog))
  }
}

export default blogSlice.reducer
