import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store/store';
import { Character } from '../utils/types';
import { ALL_CHARACTERS_API } from '../utils/constants';

export const fetchCharacters = createAsyncThunk<Character[], { page: number }>(
  'characters/fetchCharacters',
  async ({ page }) => {
    const response = await axios.get(`${ALL_CHARACTERS_API}?page=${page}`);
    return response.data.results;
  }
);

interface CharactersState {
  pages: { [key: number]: Character[] };
  currentPage: number;
}

const initialState: CharactersState = {
  pages: {},
  currentPage: 1,
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.pages[state.currentPage] = action.payload;
    });
  },
});

export const { setCurrentPage } = characterSlice.actions;
export const selectCharacters = (state: RootState) => state.characters.pages;
export const selectCurrentPage = (state: RootState) => state.characters.currentPage;

export default characterSlice.reducer;
