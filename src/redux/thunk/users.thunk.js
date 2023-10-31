import { createAsyncThunk} from '@reduxjs/toolkit'
import { fetchUsers } from '../../services/users.service'

export const fetchUsersListThunk = createAsyncThunk(
  'users/fetchUsersList',
  async (thunkApi) => {
    console.log("fetchUsersList Thunk")
    const response = await fetchUsers()
    console.log(response)
    return response
  }
)