import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducers/movieReducer'
import numberMoviesReducer from './reducers/numberMoviesReducer'

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    numberMovies: numberMoviesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch