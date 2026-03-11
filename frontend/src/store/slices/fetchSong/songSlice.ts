import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
}

const songSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        fetchSong: (state, action) => {
            state.value = action.payload;
        },
    },
});

console.log(songSlice)

export const { fetchSong } = songSlice.actions;

export default songSlice.reducer;