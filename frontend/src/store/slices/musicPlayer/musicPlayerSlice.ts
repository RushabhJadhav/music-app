import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface MusicPlayerState {
    currentTrack: any | null;
    queue: any[];
    currentIndex: number;
    isPlaying: boolean;
    volume: number;
}

const initialState: MusicPlayerState = {
    currentTrack: null,
    queue: [],
    currentIndex: -1,
    isPlaying: false,
    volume: 0.5,
}

const musicPlayerSlice = createSlice({
    name: "musicPlayer",
    initialState,
    reducers: {
        setTrack: (state, action: PayloadAction<{ track: any; queue?: any[]; index?: number }>) => {
            state.currentTrack = action.payload.track;
            if (action.payload.queue) {
                state.queue = action.payload.queue;
            }
            if (action.payload.index !== undefined) {
                state.currentIndex = action.payload.index;
            } else if (action.payload.queue) {
                state.currentIndex = action.payload.queue.findIndex((t: any) => t.id === action.payload.track.id);
            }
            state.isPlaying = true;
        },
        togglePlay: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        play: (state) => {
            state.isPlaying = true;
        },
        pause: (state) => {
            state.isPlaying = false;
        },
        nextTrack: (state) => {
            if (state.queue.length > 0) {
                const nextIndex = (state.currentIndex + 1) % state.queue.length;
                state.currentIndex = nextIndex;
                state.currentTrack = state.queue[nextIndex];
                state.isPlaying = true;
            }
        },
        previousTrack: (state) => {
            if (state.queue.length > 0) {
                const prevIndex = (state.currentIndex - 1 + state.queue.length) % state.queue.length;
                state.currentIndex = prevIndex;
                state.currentTrack = state.queue[prevIndex];
                state.isPlaying = true;
            }
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        setQueue: (state, action: PayloadAction<any[]>) => {
            state.queue = action.payload;
        }
    },
});

export const { 
    setTrack, 
    togglePlay, 
    play, 
    pause, 
    nextTrack, 
    previousTrack, 
    setVolume,
    setQueue 
} = musicPlayerSlice.actions;

export const selectCurrentTrack = (state: RootState) => state.musicPlayer.currentTrack;
export const selectIsPlaying = (state: RootState) => state.musicPlayer.isPlaying;
export const selectQueue = (state: RootState) => state.musicPlayer.queue;
export const selectVolume = (state: RootState) => state.musicPlayer.volume;
export const selectCurrentIndex = (state: RootState) => state.musicPlayer.currentIndex;

export default musicPlayerSlice.reducer;
