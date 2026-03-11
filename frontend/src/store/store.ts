import { configureStore } from '@reduxjs/toolkit';
import songReducer from './slices/fetchSong/songSlice';

const store = configureStore({
  reducer: {
    song: songReducer,
  },
});

export default store;