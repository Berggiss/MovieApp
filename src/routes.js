import Home from './routes/home.svelte';
import Movie from './routes/movie.svelte';
import Notfound from './routes/notfound.svelte';
import Search from './routes/search.svelte';
import Register from './routes/register.svelte';
import Login from './routes/login.svelte';
import Settings from './routes/ownPage.svelte';
import Changeusername from './routes/changeusername.svelte';
export default {
  '/': Home,
  '/movie/:id': Movie,
  '/search/:name': Search,
  '/register': Register,
  '/login': Login,
  '/change': Changeusername,
  '/settings': Settings,
  '*': Notfound,
};
