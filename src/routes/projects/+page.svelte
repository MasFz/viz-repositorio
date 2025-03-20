<svelte:head>
  <title>Projetos</title>
</svelte:head>

<header>

</header>
<main>
  <section class="projects">
    <h1>Projetos</h1>
    <article class="project-item">
      <h2>Projeto 1</h2>
      <p>Descrição do projeto 1.</p>
      <a href="#" class="btn-view">Ver projeto</a>
    </article>
    <article class="project-item">
      <h2>Projeto 2</h2>
      <p>Descrição do projeto 2.</p>
      <a href="#" class="btn-view">Ver projeto</a>
    </article>
  </section>
</main>
<footer>
  <p>&copy; 2025 Marcelo Angelo. Todos os direitos reservados.</p>
</footer>
<style>
    .projects {
    max-width: 1000px;
    margin: 40px auto;
    padding: 0 20px;
  }
  
  .projects h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .project-item {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  
  .project-item h2 {
    margin-bottom: 10px;
  }
  
  .btn-view {
    display: inline-block;
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #007BFF;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
  }
  
  .btn-view:hover {
    background-color: #0056b3;
  }
  
</style>