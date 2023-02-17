<script>
	import { enhance } from "$app/forms";

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<form method="POST" action="?/create" enctype="application/x-www-form-urlencoded" use:enhance>
  <div>
    <label for="text">Input some text</label>
    <input type="text" name="text" required>
  </div>
  <button>Submit</button>
</form>