import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Movie from "../../models/Movie";

const initialValue: Movie[] = []

export const moviesSlice = createSlice({
    name: 'Movies',
    initialState: {
        value: initialValue,
    },
    reducers: {
        updateMovieList: (state, action) => {
            state.value = action.payload
        }
    }
})


export const { updateMovieList } = moviesSlice.actions
export default moviesSlice.reducer