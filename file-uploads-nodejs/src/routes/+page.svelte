<script>
	/** @type {import('./$types').PageData} */
	export let data;
	/** @type {import('./$types').ActionData} */
	export let form;

	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	const errors = {
		'file:missing': 'No file specified',
		'file:invalid': 'Invalid file',
		'file:too_small': 'The file is too small'
	};
</script>

<main>
	{#if form?.error}
		<p>{errors[form.error]}</p>
	{/if}

	<h1>Upload and view files with Svelte Kit and Node.js</h1>

	<form
		class="upload-form"
		method="POST"
		action="?/upload"
		enctype="multipart/form-data"
		use:enhance
	>
		<label for="file">Select a file</label>
		<input type="file" name="file" id="file" required />
		<button>Upload</button>
	</form>

	<section>
		<h2>Uploaded files</h2>
		<ol class="files">
			{#each data.files as file (file)}
				<li transition:slide>
					<a href="/files/{file}" target="_blank">{file}</a>
					<form use:enhance method="POST" action="?/delete">
						<button name="file" value={file}>Delete</button>
					</form>
				</li>
			{/each}
		</ol>
	</section>
</main>

<style>
	:root {
		--border-radius: 7px;
	}

	main {
		font-family: sans-serif;

		max-width: 60ch;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
	}

	h1,
	h2 {
		color: hsla(0, 0%, 0%, 0.9);
	}

	button {
		font: inherit;
		cursor: pointer;
	}

	input,
	label {
		display: block;
	}

	label {
		font-weight: 700;
		margin-block-end: 0.3rem;
	}

	.upload-form {
		padding: 1rem;
		border-radius: var(--border-radius);
		background-color: hsla(0, 0%, 0%, 0.07);
	}

	.upload-form > button {
		margin-block-start: 1rem;
	}

	.files {
		padding: 0;
	}

	.files > li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
		border-radius: var(--border-radius);
	}

	.files > li:hover {
		background-color: hsla(0, 0%, 0%, 0.07);
	}

	.files > li > a {
		font-family: monospace;
		font-size: 1.2rem;
	}
</style>
