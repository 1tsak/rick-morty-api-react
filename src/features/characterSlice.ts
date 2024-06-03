import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";
import { Character } from "../utils/types";
import { ALL_CHARACTERS_API } from "../utils/constants";

export const fetchCharacters = createAsyncThunk<Character[], { page: number }>(
  "characters/fetchCharacters",
  async ({ page }) => {
    const response = await axios.get(`${ALL_CHARACTERS_API}?page=${page}`);
    return response.data.results;
  }
);
export const fetchCharacterInfo = createAsyncThunk<Character, string>(
  "character/fetchCharacter",
  async (id: string) => {
    const response = await axios.get(`${ALL_CHARACTERS_API}/${id}`);
    return response.data;
  }
);

interface CharactersState {
  pages: { [key: number]: Character[] };
  currentPage: number;
  characterInfo: Character;
}

const initialState: CharactersState = {
  pages: {},
  currentPage: 1,
  characterInfo: {} as Character,
};

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.pages[state.currentPage] = action.payload;
    });
    builder.addCase(fetchCharacterInfo.fulfilled, (state, action) => {
      state.characterInfo = action.payload;
    });
  },
});

export const { setCurrentPage } = characterSlice.actions;
export const selectCharacters = (state: RootState) => state.characters.pages;
export const selectCharacterInfo = (state: RootState) =>
  state.characters.characterInfo;
export const selectCurrentPage = (state: RootState) =>
  state.characters.currentPage;

export default characterSlice.reducer;
