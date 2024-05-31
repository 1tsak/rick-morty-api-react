import { configureStore } from '@reduxjs/toolkit';
import characterReducer from '../features/characterSlice';
import episodeReducer from '../features/episodeSlice';
import locationReducer from '../features/locationSlice';

const store = configureStore({
  reducer: {
    characters: characterReducer,
    episodes: episodeReducer,
    locations: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
