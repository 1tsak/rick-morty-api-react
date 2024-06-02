// Episode Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store/store';
import { Episode } from '../utils/types';
import { ALL_EPISODES_API } from '../utils/constants';

export const fetchEpisodes = createAsyncThunk<Episode[], { page: number }>(
  'episodes/fetchEpisodes',
  async ({ page }) => {
    const response = await axios.get(`${ALL_EPISODES_API}?page=${page}`);
    return response.data.results;
  }
);

interface EpisodesState {
  pages: { [key: number]: Episode[] };
  currentPage: number;
}

const initialState: EpisodesState = {
  pages: {},
  currentPage: 1,
};

const episodeSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
      state.pages[state.currentPage] = action.payload;
    });
  },
});

export const { setCurrentPage: setEpisodePage } = episodeSlice.actions;
export const selectEpisodes = (state: RootState) => state.episodes.pages;
export const selectCurrentEpisodePage = (state: RootState) => state.episodes.currentPage;

export default episodeSlice.reducer;
