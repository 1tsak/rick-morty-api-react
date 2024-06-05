import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store/store';
import { BASE_URL } from '../utils/constants';

interface SearchState {
  query: string;
  type: string;
  status: string;
  gender: string;
  results: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  type: 'character', // default type
  status: 'none',
  gender: 'none',
  results: [],
  loading: false,
  error: null,
};

interface FetchSearchResultsParams {
  query: string;
  type: string;
  status: string;
  gender: string;
}

// Async thunk for fetching search results
export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (params: FetchSearchResultsParams) => {
    const { query, type, status, gender } = params;
    let url = `${BASE_URL}/${type}/?name=${query}`;
    if (status !== 'none') url += `&status=${status}`;
    if (gender !== 'none') url += `&gender=${gender}`;
    const response = await axios.get(url);
    return response.data.results;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch search results';
      });
  },
});

export const { setQuery, setType, setStatus, setGender } = searchSlice.actions;

export default searchSlice.reducer;

// Selectors
export const selectSearch = (state: RootState) => state.search;
