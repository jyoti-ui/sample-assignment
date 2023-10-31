import {  createSlice } from '@reduxjs/toolkit'
import { fetchUsersListThunk } from '../thunk/users.thunk'

const initialState = {
    usersList : null,
    loading : false
}

 const userSlice = createSlice({
    name: 'users',
    initialState: initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchUsersListThunk.pending, (state) => {
        state.loading = true
      })
      builder.addCase(fetchUsersListThunk.fulfilled, (state, action) => {
        state.usersList = action.payload;
        state.loading = false;
      })
      builder.addCase(fetchUsersListThunk.rejected, (state, action) => {
        state.loading = true
      })
    },
  })

  export default userSlice.reducer