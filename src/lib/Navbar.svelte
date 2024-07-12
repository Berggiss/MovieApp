<script>
  // @ts-nocheck
  import { searchMovies } from '../fetchStore';
  import { push } from 'svelte-spa-router';
  import { userIsLoggedIn } from '../userStore';
  import Logo from '../assets/logo.png';

  let inputValue;

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies(inputValue);
  };

  function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greeting;

    if (currentHour < 12) {
      greeting = 'Good morning!';
    } else if (currentHour < 18) {
      greeting = 'Good afternoon!';
    } else {
      greeting = 'Good evening!';
    }

    return greeting;
  }

  const greeting = getGreeting();
</script>

<nav>
  <a href="/" on:click={() => push('/')}>
    <img src={Logo} alt="Logo" class="mb-4" />
  </a>

  <form on:submit={handleSubmit}>
    <input
      class="search"
      type="search"
      id="default-search"
      placeholder="Search Spiderman, Marvel..."
      required
      bind:value={inputValue}
    />
    <button type="submit">Search</button>
  </form>

  {#if $userIsLoggedIn}
    <button class="ownPage" on:click={() => push('/settings')}
      >{greeting}!</button
    >
  {:else}
    <button class="login" on:click={() => push('/login')}>Login</button>
  {/if}
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  nav img {
    max-width: 100px;
    height: auto;
    transition: transform 0.3s ease;
  }

  nav img:hover {
    transform: scale(1.1);
    box-shadow: none;
  }

  .search {
    width: 15rem;
    height: 2rem;
    border: none;
    background-color: #292929;
    padding: 5px 10px;
    font-size: 16px;
  }

  .search:hover {
    border: none;
    background-color: #292929;
  }

  .search:focus {
    outline: none;
    box-shadow: none;
  }

  nav form {
    flex-grow: 1;
    text-align: center;
    margin: 0 20px;
  }

  form button {
    transition: transform 0.3s ease;
  }

  form button:hover {
    transform: scale(1.1);
  }

  .login {
    transition: transform 0.3s ease;
  }

  .login:hover {
    transform: scale(1.1);
  }

  .ownPage {
    transition: transform 0.3s ease;
  }

  .ownPage:hover {
    transform: scale(1.1);
  }
</style>
