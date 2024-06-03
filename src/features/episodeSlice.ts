import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";
import { Episode } from "../utils/types";
import { ALL_EPISODES_API } from "../utils/constants";

export const fetchEpisodes = createAsyncThunk<Episode[], { page: number }>(
  "episodes/fetchEpisodes",
  async ({ page }) => {
    const response = await axios.get(`${ALL_EPISODES_API}?page=${page}`);
    return response.data.results;
  }
);
export const fetchEpisodeInfo = createAsyncThunk<Episode, string>(
  "episode/fetchEpisodeInfo",
  async (id: string) => {
    const response = await axios.get(`${ALL_EPISODES_API}/${id}`);
    return response.data;
  }
);

interface EpisodesState {
  pages: { [key: number]: Episode[] };
  currentPage: number;
  episodeInfo: Episode;
}

const initialState: EpisodesState = {
  pages: {},
  currentPage: 1,
  episodeInfo: {} as Episode,
};

const episodeSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
      state.pages[state.currentPage] = action.payload;
    });
    builder.addCase(fetchEpisodeInfo.fulfilled, (state, action) => {
      state.episodeInfo = action.payload;
    });
  },
});

export const { setCurrentPage: setEpisodePage } = episodeSlice.actions;
export const selectEpisodes = (state: RootState) => state.episodes.pages;
export const selectEpisodeInfo = (state: RootState) =>
  state.episodes.episodeInfo;
export const selectCurrentEpisodePage = (state: RootState) =>
  state.episodes.currentPage;

export default episodeSlice.reducer;
