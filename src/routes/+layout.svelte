<script>
  import { page } from '$app/stores'
</script>

<svelte:head>
  <title>Wordpress Login Example</title>
</svelte:head>

<nav>
  {#if !$page.data.user}
    <a href="/login">Login</a>
    <a href="/register">Register</a>
    <a href="/members">members</a>
  {/if}
  {#if $page.data.user}
    Hello {$page.data.user.name}
    <a href="/members">members</a>
    <form action="/logout" method="POST">
      <button type="submit">Log out</button>
    </form>
  {/if}
</nav>

<main>
  <slot />
</main>