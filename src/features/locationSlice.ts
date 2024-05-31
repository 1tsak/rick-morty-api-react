import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store/store';
import { Location } from '../utils/types';
import { ALL_LOCATION_API } from '../utils/constants';

export const fetchLocations = createAsyncThunk<Location[]>('locations/fetchLocations', async () => {
  const response = await axios.get(ALL_LOCATION_API);
  return response.data.results;
});

const locationSlice = createSlice({
  name: 'locations',
  initialState: [] as Location[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectLocations = (state: RootState) => state.locations;

export default locationSlice.reducer;
