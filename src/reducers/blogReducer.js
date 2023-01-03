import { createSlice } from '@reduxjs/toolkit';
import { addComment, getOne } from '../services/blogs';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {},
  reducers: {
    setBlog(state, action) {
      return action.payload;
    },
    replaceBlog(state, action) {
      const newState = { ...action.payload };
      delete newState.comments;
      newState.comments = action.payload.comments;
      return newState;
    },
  },
});

export const { setBlog, replaceBlog } = blogSlice.actions;

export const fetchBlog = (id) => {
  return async (dispatch) => {
    console.log(id);
    const blog = await getOne(id);
    dispatch(setBlog(blog));
  };
};

export const commentOnBlog = (id, comment) => {
  return async (dispatch) => {
    const commentObject = { comment };
    const returnedBlog = await addComment(id, commentObject);
    dispatch(replaceBlog(returnedBlog));
  };
};

export default blogSlice.reducer;
