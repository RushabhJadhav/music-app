import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import axios from "axios";

export const fetchSongs = createAsyncThunk(
    "song/fetchSongs",
    async (query: string) => {
        const response = await axios.get(`https://saavn.sumit.co/api/search/songs?query=${query}`);
        return response.data.data.results;
    }
);

interface SongState {
    query: string;
    results: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: SongState = {
    query: "",
    results: [],
    status: 'idle',
    error: null,
}

const songSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSongs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.results = action.payload;
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch songs';
            });
    },
});

export const { setQuery } = songSlice.actions;

export const selectSearchQuery = (state: RootState) => state.song.query;
export const selectSearchResults = (state: RootState) => state.song.results;
export const selectSearchStatus = (state: RootState) => state.song.status;

export default songSlice.reducer;