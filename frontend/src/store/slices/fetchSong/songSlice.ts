import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface InputSong {
    value: String
}

const initialState: InputSong = {
    value: "",
}

const songSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        fetchSong: (state, action: PayloadAction<String>) => {
            state.value = action.payload;
        },
    },
});

export const { fetchSong } = songSlice.actions;

export const selectSong = (state: RootState) => state.song.value

export default songSlice.reducer;