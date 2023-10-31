import {  createSlice } from '@reduxjs/toolkit'
import { fetchPostsThunk } from '../thunk/posts.thunk'

const initialState = {
    posts : [],
    loading : false
}

 const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchPostsThunk.pending, (state) => {
        state.loading = true
      })
      builder.addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      builder.addCase(fetchPostsThunk.rejected, (state) => {
        state.loading = true
      })
    },
  })

  export default postsSlice.reducer