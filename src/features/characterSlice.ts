import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store/store';
import { Character } from '../utils/types';
import { ALL_CHARACTERS_API } from '../utils/constants';

export const fetchCharacters = createAsyncThunk<Character[]>('characters/fetchCharacters', async () => {
  const response = await axios.get(ALL_CHARACTERS_API);
  return response.data.results;
});

const characterSlice = createSlice({
  name: 'characters',
  initialState: [] as Character[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCharacters = (state: RootState) => state.characters;

export default characterSlice.reducer;
