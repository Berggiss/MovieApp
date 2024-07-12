<!-- App.svelte -->

<script>
  import { onMount } from 'svelte';
  import Router from 'svelte-spa-router';
  import routes from './routes';
  import { push } from 'svelte-spa-router';
  import { userIsLoggedIn } from './userStore';

  onMount(() => {
    const loggedIn = sessionStorage.getItem('userIsLoggedIn');
    if (loggedIn === 'true') {
      userIsLoggedIn.set(true);
    }
    push('/');
  });
</script>

<main>
  <div>
    <Router {routes}></Router>
  </div>
</main>

<style>
</style>
