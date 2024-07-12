<script>
  import { push } from 'svelte-spa-router';

  let newUsername = '';

  const updateUsername = async () => {
    try {
      const userId = sessionStorage.getItem('userId');

      const response = await fetch('http://localhost:3000/users/change', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userId,
        },
        body: JSON.stringify({ newUsername }),
      });

      if (response.ok) {
        alert('Username updated successfully');
        push('/');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while updating username');
    }
  };
</script>

<main class="change">
  <div class="form-container" on:submit|preventDefault={updateUsername}>
    <p class="title">Change username</p>
    <form class="form">
      <div class="input-group">
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder=""
          bind:value={newUsername}
          required
        />
      </div>

      <button class="sign" type="submit">Confirm</button>
    </form>
  </div>
</main>

<style>
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
</style>
