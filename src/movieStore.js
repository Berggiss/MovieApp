// store.js

import { writable } from 'svelte/store';

const moviesStore = writable([]);

export { moviesStore };
