import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import axiosInstance from "../../../lib/axios";

export const fetchSearchResults = createAsyncThunk(
    "song/fetchSearchResults",
    async (query: string) => {
        const response = await axiosInstance.get(`/search/songs?query=${query}`);
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
        },
        clearResults: (state) => {
            state.results = [];
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.results = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch results';
            });
    },
});

export const { setQuery, clearResults } = songSlice.actions;

export const selectSearchQuery = (state: RootState) => state.song.query;
export const selectSearchResults = (state: RootState) => state.song.results;
export const selectSearchStatus = (state: RootState) => state.song.status;

export default songSlice.reducer;