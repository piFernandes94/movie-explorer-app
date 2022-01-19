import React, {useEffect, useState} from 'react';
import '../styles/App.css';
import '../styles/index.scss';
import { fetchMovies } from '../scripts/DataFunctions';
import Movie from '../models/Movie';
import { updateMovieList } from '../state/reducers/movieReducer';
import { useAppDispatch } from '../state/hooks';
import HomePage from './HomePage';
import { updateNumberMovies } from '../state/reducers/numberMoviesReducer';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchMovies().then((response) => {
      dispatch(updateMovieList(response));
    });
  })

  return (
    <div className="custom-container">
      <HomePage />
    </div>
  );
}

export default App;
