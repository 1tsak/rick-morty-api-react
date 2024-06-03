import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";
import { Location } from "../utils/types";
import { ALL_LOCATIONS_API } from "../utils/constants";

export const fetchLocations = createAsyncThunk<Location[], { page: number }>(
  "locations/fetchLocations",
  async ({ page }) => {
    const response = await axios.get(`${ALL_LOCATIONS_API}?page=${page}`);
    return response.data.results;
  }
);
export const fetchLocationInfo = createAsyncThunk<Location, string>(
  "locations/fetchLocationInfo",
  async (id: string) => {
    const response = await axios.get(`${ALL_LOCATIONS_API}/${id}`);
    return response.data;
  }
);

interface LocationsState {
  pages: { [key: number]: Location[] };
  currentPage: number;
  locationInfo: Location;
}

const initialState: LocationsState = {
  pages: {},
  currentPage: 1,
  locationInfo: {} as Location,
};

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.pages[state.currentPage] = action.payload;
    });
    builder.addCase(fetchLocationInfo.fulfilled,(state,action)=>{
      state.locationInfo=action.payload;
    })
  },
});

export const { setCurrentPage: setLocationPage } = locationSlice.actions;
export const selectLocations = (state: RootState) => state.locations.pages;
export const selectLocationInfo = (state: RootState) =>
  state.locations.locationInfo;
export const selectCurrentLocationPage = (state: RootState) =>
  state.locations.currentPage;

export default locationSlice.reducer;
