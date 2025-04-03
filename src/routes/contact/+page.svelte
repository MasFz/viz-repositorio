<svelte:head>
  <title>Fala Comigo!</title>
</svelte:head>

<header>
</header>

<main>
  <section class="contact-form">
    <h1>Entre em contato</h1>
    <form action="/action_page.php" method="POST">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="nome" required placeholder="Digite seu nome completo">
      </div>
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" required placeholder="seuemail@exemplo.com">
      </div>
      <div class="form-group">
        <label for="assunto">Assunto:</label>
        <input type="text" id="assunto" name="assunto" required placeholder="Informe o assunto">
      </div>
      <div class="form-group">
        <label for="mensagem">Mensagem:</label>
        <textarea id="mensagem" name="mensagem" rows="5" required placeholder="Escreva aqui sua mensagem..."></textarea>
      </div>
      <button type="submit" class="btn-submit">Enviar</button>
    </form>
  </section>
</main>

<footer>
  <p>&copy; 2025 Marcelo Angelo. Todos os direitos reservados.</p>
</footer>

<style>
  .contact-form {
    max-width: 600px;
    background-color: var(--card-background);
    margin: 40px auto;
    padding: 2rem;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  
  .contact-form h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    /* Utiliza a variável de texto para garantir a legibilidade em ambos os temas */
    color: var(--text);
  }
  
  .form-group input[type="text"],
  .form-group input[type="email"],
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: var(--background);
    color: var(--text);
  }
  
  .form-group textarea {
    resize: vertical;
  }
  
  .btn-submit {
    display: block;
    width: 100%;
    padding: 0.75rem;
    background-color: var(--link-hover);
    color: var(--background);
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-submit:hover {
    background-color: var(--link-color);
  }
</style>
