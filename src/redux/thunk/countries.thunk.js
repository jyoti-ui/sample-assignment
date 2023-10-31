import { createAsyncThunk} from '@reduxjs/toolkit'
import { fetchCountries, fetchCountryTime } from '../../services/countries.service'

export const fetchCountriesListThunk = createAsyncThunk(
  'users/fetchCountries',
  async (thunkApi) => {
    const response = await fetchCountries()
    return response
  }
)


export const fetchCountryTimeThunk = createAsyncThunk(
  'users/fetchCountryTime',
  async ({data}, thunkApi) => {
    console.log('thunk called')
    const response = await fetchCountryTime(data)
    console.log(response)
    return response
  }
)