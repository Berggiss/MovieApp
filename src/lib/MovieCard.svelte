<script>
  export let movie;
</script>

<div class="movie-card">
  <div>
    {#if movie.poster_path}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.name}
      />
    {:else}
      <p>Kuva ei ole saatavilla</p>
    {/if}
  </div>
</div>

<style>
</style>
