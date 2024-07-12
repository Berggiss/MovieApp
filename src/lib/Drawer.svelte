<script>
  import { userIsLoggedIn } from '../userStore';
  import { push } from 'svelte-spa-router';

  export let open = false;

  function closeDrawer() {
    open = false;
  }

  function logOut() {
    userIsLoggedIn.set(false);
    sessionStorage.removeItem('userId');
    push('/');
  }

  async function deleteUser() {
    try {
      const userId = sessionStorage.getItem('userId');

      const response = await fetch('http://localhost:3000/users/deleteuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userId,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      userIsLoggedIn.set(false);
      push('/');
    } catch (error) {
      console.error('Error', error);
    }
  }
</script>

<div class="drawer {open ? 'open' : ''}">
  <div class="button-group">
    <div class="top-buttons">
      <button class="button" on:click={logOut}>Log Out</button>
      <button class="button" on:click={() => push('/change')}
        >Change Username</button
      >
      <button class="button">Help</button>
      <button class="button">FaQ</button>
    </div>

    <button class="button delete" on:click={deleteUser}>Delete account</button>
  </div>

  <button class="close" on:click={closeDrawer}
    ><span class="material-symbols-outlined"> close </span></button
  >
</div>

<style>
  .drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    background-color: #212121;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;
    transform: translateX(100%);
    z-index: 1000;
  }

  .drawer.open {
    transform: translateX(0);
  }

  .button-group {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90%;
    margin: 2rem;
  }

  .top-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 2rem;
  }

  .top-buttons button:hover {
    background-color: rgba(137, 137, 137, 0.578);
  }

  .close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  .button {
    width: 100%;
    padding: 0.5rem;
    text-align: center;
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 0.375rem;
    font-weight: 400;
  }

  .delete {
    align-self: flex-end;
    background-color: rgb(209, 17, 17);
    color: black;
  }
</style>
