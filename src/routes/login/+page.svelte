<script>
  export let form
</script>

<h1>Login</h1>

<form action="?/login" method="POST">
  <div>
    <label for="username">Username</label>
    <input id="username" name="username" type="text" required />
  </div>

  <div>
    <label for="password">Password</label>
    <input id="password" name="password" type="password" required />
  </div>
  {#if form?.message}
    <p>{form.message}</p>
  {/if}
  <button type="submit">Login</button>
</form>