<script>
	import '$lib/css/styles.css';

	import { onMount } from 'svelte';
  import sse_store from '$lib/stores/sse.js'
	import Toasts, { toasts } from '$lib/components/Toasts.svelte';

  let position = "top";

  onMount(() => {
    sse_store.connect();
  });

  $: $sse_store && toasts.show($sse_store);
</script>

<Toasts {position} />

<main>
	<article>
		<h1>Svelte Kit SSE + Toasts Example</h1>

		<p>
			Every few seconds the endpoint will dispatch
			a random notification to the frontend through Server Sent Events (SSE). You can also click one
			of the buttons below to programmatically trigger a toast notification yourself. Try it out!
		</p>

		<div class="button-group">
			<fieldset>
				<legend>Toast position</legend>
				<div>
					<input type="radio" name="position" id="top" value="top" bind:group={position} />
					<label for="top">Top</label>
				</div>
				<div>
					<input type="radio" name="position" id="bottom" value="bottom" bind:group={position} />
					<label for="bottom">Bottom</label>
				</div>
			</fieldset>

			<button on:click={() => toasts.error('Invalid email or password.')}>Error!</button>
			<button on:click={() => toasts.success('Your settings have been saved.')}>Success!</button>
			<button on:click={() => toasts.dismiss_all()}>Dismiss All</button>
		</div>

		<p>Toasts are automatically dismissed after 3 seconds.</p>

    <h2>How It Works</h2>
    <ol>
      <li>
        abc
      </li>
      <li>
        The endpoint in <span>src/routes/api/notifcations/+server.js</span> returns a ReadableStream
      </li>
    </ol>

    <h2>Support</h2>
    <p>Do you have questions or need help?</p>
	</article>
</main>

<style>
	main {
		height: 100%;
		display: grid;
		place-items: center;
	}

	article {
		max-width: 55ch;
	}

	.button-group {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}
</style>
