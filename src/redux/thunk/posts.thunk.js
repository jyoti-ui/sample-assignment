import { createAsyncThunk} from '@reduxjs/toolkit'
import { fetchPosts } from '../../services/posts.service'

export const fetchPostsThunk = createAsyncThunk(
  'users/fetchPosts',
  async (thunkApi) => {
    const response = await fetchPosts()
    console.log(response)
    return response
  }
)