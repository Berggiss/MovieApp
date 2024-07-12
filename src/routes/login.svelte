<script>
  // @ts-nocheck

  import { push } from 'svelte-spa-router';
  import { fade } from 'svelte/transition';
  import { userIsLoggedIn } from '../userStore';

  let username = '';
  let password = '';
  let waiting = false;

  async function handleLogin() {
    const formData = {
      username,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      if (!data.success) {
        throw new Error(data.message);
      }

      const userId = data.userid;

      sessionStorage.setItem('userId', userId);

      userIsLoggedIn.set(true);

      waiting = true;

      setTimeout(() => {
        waiting = false;
        push('/');
      }, 5000); //
    } catch (error) {
      console.error('Virhe:', error);

      alert('Login failed. Please check your username and password.');
    }
  }
</script>

<main in:fade={{ y: 0, duration: 500 }}>
  {#if waiting}
    <div class="loader">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
  {:else}
    <div class="form-container" on:submit|preventDefault={handleLogin}>
      <p class="title">Login</p>
      <form class="form">
        <div class="input-group">
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder=""
            bind:value={username}
            required
          />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder=""
            bind:value={password}
            required
          />
        </div>
        <button class="sign" type="submit">Sign in</button>
      </form>

      <p class="signup">
        Don't have an account?
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <a rel="noopener noreferrer" on:click={() => push('/register')} class=""
          >Sign up</a
        >
      </p>
    </div>
  {/if}
</main>

<style>
  /* Uiuniverse otin tälläsen valmiiks rakennetun loading elemntin */
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .bar {
    display: inline-block;
    width: 3px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    animation: scale-up4 1s linear infinite;
  }

  .bar:nth-child(2) {
    height: 35px;
    margin: 0 5px;
    animation-delay: 0.25s;
  }

  .bar:nth-child(3) {
    animation-delay: 0.5s;
  }

  @keyframes scale-up4 {
    20% {
      background-color: #ffff;
      transform: scaleY(1.5);
    }

    40% {
      transform: scaleY(1);
    }
  }

  .form-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    border-radius: 0.75rem;
    background-color: #151515;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
    padding: 3rem;
    color: rgba(243, 244, 246, 1);
  }

  .title {
    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
  }

  .form {
    margin-top: 1.5rem;
  }

  .input-group {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .input-group label {
    display: block;
    color: rgba(156, 163, 175, 1);
    margin-bottom: 4px;
  }

  .input-group input {
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid rgb(12, 12, 12);
    outline: 0;
    background-color: rgb(69, 69, 69);
    padding: 0.75rem 1rem;
    color: rgba(243, 244, 246, 1);
  }

  .input-group input:focus {
    box-shadow: none;
    border-color: rgba(247, 98, 35);
  }

  .signup a {
    color: rgba(243, 244, 246, 1);
    text-decoration: none;
    font-size: 14px;
  }

  .signup a:hover {
    cursor: pointer;
    text-decoration: underline rgb(247, 98, 35);
  }

  .sign {
    display: block;
    width: 100%;
    background-color: rgb(247, 98, 35);
    padding: 0.75rem;
    text-align: center;
    color: rgba(17, 24, 39, 1);
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    margin-top: 2rem;
  }

  .signup {
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175, 1);
    margin-top: 0.7rem;
  }
</style>
