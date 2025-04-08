<script>
  import { onMount } from "svelte";

  let githubData = null;
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch("https://api.github.com/users/MasFz");
      githubData = await response.json();
    } catch (err) {
      error = err;
    }
    loading = false;
  });
</script>

<svelte:head>
  <title>Página Inicial</title>
  <style>
    .imagem-padrao {
      width: 400px;
      height: auto;
      max-width: 100%;
    }
  </style>
</svelte:head>

<header>
</header>

<main>
  <section class="intro">
    <h1>Marcelo Angelo</h1>
    <p>Aluno de Ciência de Dados</p>
    <figure>
      <img src="images/celos.jpeg" alt="Fotinha do pai 😎" class="imagem-padrao">
    </figure>
  </section>

  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p class="error">Something went wrong: {error.message}</p>
  {:else}
    <section>
      <h2>My GitHub Stats</h2>
      <dl>
        <dt>Followers</dt>
        <dd>{githubData.followers}</dd>
        <dt>Following</dt>
        <dd>{githubData.following}</dd>
        <dt>Public Repositories</dt>
        <dd>{githubData.public_repos}</dd>
      </dl>
    </section>
  {/if}
</main>

<footer>
  <p>&copy; 2025 Marcelo Angelo. Todos os direitos reservados.</p>
</footer>
