import { moviesStore } from './movieStore';
import { push } from 'svelte-spa-router';

let searchTerm = '';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    // Tähän oma tokeni alle
    Authorization:
  },
};

const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular`,
      options
    );

    const data = await response.json();
    console.log(data);

    if (data.results) {
      moviesStore.update((movies) => [...movies, ...data.results]);
    } else {
      console.error('Movies not found');
    }
  } catch (error) {
    console.error('Error while fetching movies', error);
  }
};

const searchMovies = async (movie) => {
  searchTerm = movie;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
      options
    );

    const data = await response.json();
    console.log(data);

    if (data.results) {
      moviesStore.set(data.results);
      push(`/search/${searchTerm}`);
    } else {
      console.error('Movies not found');
    }
  } catch (error) {
    console.error('Error while fetching movies', error);
  }
};

export { fetchPopularMovies, searchMovies };
