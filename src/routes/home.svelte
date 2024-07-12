<script>
  // @ts-nocheck

  import MovieCard from '../lib/MovieCard.svelte';
  import { onMount } from 'svelte';
  import { moviesStore } from '../movieStore';
  import { fetchPopularMovies } from '../fetchStore';
  import Navbar from '../lib/Navbar.svelte';
  import { link } from 'svelte-spa-router';
  import { valittuMovieStore } from '../ChosenMovie';
  import { fade } from 'svelte/transition';

  let movies = [];

  $: movies = $moviesStore;

  function showDetails(movie) {
    valittuMovieStore.set(movie);
  }

  function fetchOnce() {
    if (movies.length === 0) {
      fetchPopularMovies();
    }
  }

  onMount(fetchOnce);
</script>

<main in:fade={{ y: 0, duration: 500 }}>
  <Navbar></Navbar>

  <div class="movie-list">
    {#each movies.slice(0, 30) as movie, id}
      <div class="movie">
        <a
          href="#/movie/{movie.id}"
          use:link
          on:click={() => showDetails(movie)}
        >
          <MovieCard {movie} />
        </a>
      </div>
    {/each}
  </div>
</main>

<style>
</style>
