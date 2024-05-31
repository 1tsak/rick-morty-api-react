import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store/store';
import { Episode } from '../utils/types';
import { ALL_EPISODES_API } from '../utils/constants';

export const fetchEpisodes = createAsyncThunk<Episode[]>('episodes/fetchEpisodes', async () => {
  const response = await axios.get(ALL_EPISODES_API);
  return response.data.results;
});

const episodeSlice = createSlice({
  name: 'episodes',
  initialState: [] as Episode[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectEpisodes = (state: RootState) => state.episodes;

export default episodeSlice.reducer;
