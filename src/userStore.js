import { writable } from 'svelte/store';

export const user = writable({
  username: '',
  movies: [],
});

export const userIsLoggedIn = writable(false);
