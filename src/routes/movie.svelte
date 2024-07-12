<script>
  // @ts-nocheck

  import { valittuMovieStore } from '../ChosenMovie';
  import { userIsLoggedIn } from '../userStore';
  import { fade } from 'svelte/transition';

  const addNewMovie = async ($valittuMovieStore) => {
    const userId = sessionStorage.getItem('userId');
    try {
      const response = await fetch('http://localhost:3000/users/addmovie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userId,
        },
        body: JSON.stringify({ movieId: $valittuMovieStore.id }),
      });
      const data = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };
</script>

<main in:fade={{ y: 0, duration: 1000 }}>
  <div class="jokku">
    <div class="joku">
      <div class="jou">
        <div class="flex items-center">
          <svg
            class="w-4 h-4 text-yellow-300 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path
              d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            />
          </svg>
          <p class="ms-2 text-sm font-bold">
            {$valittuMovieStore.vote_average}
          </p>
          <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
          <p class="text-sm font-medium">
            {$valittuMovieStore.vote_count} Votes
          </p>
        </div>

        <h3 class="">
          {$valittuMovieStore.title}
        </h3>

        {#if $userIsLoggedIn === true}
          <button on:click={addNewMovie($valittuMovieStore)}>
            <span class="material-symbols-outlined"> favorite </span>
          </button>
        {/if}
      </div>
      <img
        src="https://image.tmdb.org/t/p/original{$valittuMovieStore.backdrop_path}"
        alt="movie.title"
      />

      <p class="description">{$valittuMovieStore.overview}</p>

      <p class="release">Release date: {$valittuMovieStore.release_date}</p>
    </div>
  </div>
</main>

<style>
  h3 {
    font-size: 1.7rem;
    line-height: 2.25rem;
    font-weight: 700;
    text-transform: uppercase;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .jou {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  .joku {
    padding-left: 1rem;
    padding-right: 1rem;
    align-items: center;
    max-width: 80rem;
    text-align: center;
  }

  .jokku {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #292929;
  }

  img {
    height: auto;
    margin: 1rem;
  }

  .description {
    font-size: 1.3rem;
    margin: 1rem;
  }

  .release {
    font-size: 1rem;
    margin: 1rem;
  }
</style>
