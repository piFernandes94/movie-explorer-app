import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const numberMoviesSlice = createSlice({
    name: 'NumberMovies',
    initialState: {
        value: 0,
    },
    reducers: {
        updateNumberMovies: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { updateNumberMovies } = numberMoviesSlice.actions
export default numberMoviesSlice.reducer