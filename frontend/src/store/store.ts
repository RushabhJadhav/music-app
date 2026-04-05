import { configureStore } from '@reduxjs/toolkit';
import songReducer from "./slices/fetchSong/songSlice";
import musicPlayerReducer from "./slices/musicPlayer/musicPlayerSlice";

const store = configureStore({
  reducer: {
    song: songReducer,
    musicPlayer: musicPlayerReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch