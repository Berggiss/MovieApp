<script>
  // @ts-nocheck

  import { onMount } from 'svelte';
  import { valittuMovieStore } from '../ChosenMovie';
  import { link } from 'svelte-spa-router';
  import { fade } from 'svelte/transition';

  import MovieCard from '../lib/MovieCard.svelte';
  import Drawer from '../lib/Drawer.svelte';

  let drawerOpen = false;
  let movies = [];

  function toggleDrawer() {
    drawerOpen = !drawerOpen;
  }

  onMount(async () => {
    try {
      const userId = sessionStorage.getItem('userId');

      const response = await fetch(`http://localhost:3000/users/findmovies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userId,
        },
      });

      if (!response.ok) {
        throw new Error('Error retrieving users movies.');
      }

      const data = await response.json();

      for (const movie of data.movies) {
        const tmdbResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=5129fbe16046b76ac4bb4384d72ca236`
        );
        if (tmdbResponse.ok) {
          const tmdbData = await tmdbResponse.json();
          console.log('Movie details:', tmdbData);
          movies = [...movies, tmdbData];
        } else {
          console.error('Error retrieving movie information from TMDb API.');
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

  function showDetails(movie) {
    valittuMovieStore.set(movie);
  }
</script>

<main>
  <div class="ownpage" in:fade={{ y: 0, duration: 1000 }}>
    <div class="header">
      <button class="hamburger" on:click={toggleDrawer}
        ><span class="material-symbols-outlined"> menu </span></button
      >
      <!--   <h1>Your liked movies!</h1> -->
    </div>

    <Drawer open={drawerOpen} />

    <div class="movie-list">
      {#each movies as movie, id}
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
  </div>
</main>

<style>
  .ownpage {
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* h1 {
    margin: 0;
    font-size: 1.5rem;
    line-height: 2.25rem;
    font-weight: 700;
  } */

  .hamburger {
    position: absolute;
    right: 0;
  }
</style>
