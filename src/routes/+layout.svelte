<script>
    import { page } from "$app/stores";
    import { base } from "$app/paths";
  
    let pages = [
      { url: "/", title: "Home" },
      { url: "/projects", title: "Projects" },
      { url: "/contact", title: "Contact" },
      { url: "/cv", title: "Cv" }
    ];
  
    // Utilizamos localStorage se disponível
    let storage = globalThis.localStorage ?? {};
    let colorScheme = storage.colorScheme ?? "light";
    let root = globalThis?.document?.documentElement;
  
    // Atualiza o atributo "data-theme" no elemento raiz
    $: root?.setAttribute("data-theme", colorScheme);
    $: storage.colorScheme = colorScheme;
  </script>
  
  <nav>
    {#each pages as p}
      <a
        href={p.url.startsWith("http") ? p.url : `${base}${p.url}`}
        class:current={$page.route.id === p.url}
        target={p.url.startsWith("http") ? "_blank" : undefined}
      >
        {p.title}
      </a>
    {/each}
  </nav>
  
  <label class="color-scheme">
    Tema:
    <select bind:value={colorScheme}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  
  <slot />
  