import {  createSlice } from '@reduxjs/toolkit'
import { fetchCountriesListThunk, fetchCountryTimeThunk } from '../thunk/countries.thunk'

const initialState = {
    countries : [],
    countryTime : null,
    loading : false
}
 const countriesSlice = createSlice({
    name: 'countries',
    initialState: initialState,
    extraReducers: (builder) => {
      builder.addCase(fetchCountriesListThunk.pending, (state) => {
        state.loading = true
      })
      builder.addCase(fetchCountriesListThunk.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loading = false;
      })
      builder.addCase(fetchCountriesListThunk.rejected, (state, action) => {
        state.loading = true
      })
      builder.addCase(fetchCountryTimeThunk.pending, (state) => {
        state.loading = true
      })
      builder.addCase(fetchCountryTimeThunk.fulfilled, (state, action) => {
        state.countryTime = action.payload;
        state.loading = false;
      })
      builder.addCase(fetchCountryTimeThunk.rejected, (state, action) => {
        state.loading = true
      })
    },
  })

  export default countriesSlice.reducer