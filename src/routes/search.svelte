<script>
  // @ts-nocheck

  import MovieCard from '../lib/MovieCard.svelte';
  import { moviesStore } from '../movieStore';
  import Navbar from '../lib/Navbar.svelte';
  import { valittuMovieStore } from '../ChosenMovie';
  import { link } from 'svelte-spa-router';
  import { fade } from 'svelte/transition';

  function showDetails(movie) {
    valittuMovieStore.set(movie);
  }

  let movies = [];

  $: movies = $moviesStore;
</script>

<main in:fade={{ y: 0, duration: 500 }}>
  <Navbar></Navbar>

  <div class="movie-list">
    {#each movies as movie, id}
      <div class="movie">
        <a
          href="/movie/{movie.id}"
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
