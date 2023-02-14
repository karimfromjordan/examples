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

	<form use:enhance method="POST" action="?/upload" enctype="multipart/form-data">
		<h2>Upload</h2>
		<label for="small_file">File</label>
		<input type="file" name="file" id="small_file" required />
		<button>Upload</button>
	</form>

	<section>
		<h2>Uploaded files</h2>
		<ol class="files">
			{#each data.files as file (file)}
				<li transition:slide>
					<a href="/files/{file}" target="_blank">{file}</a>
					<form use:enhance method="POST" action="?/delete">
						<input type="hidden" name="file" value={file} />
						<button>Delete</button>
					</form>
				</li>
			{/each}
		</ol>
	</section>
</main>

<style>
	main {
		font-family: sans-serif;

		max-width: 60ch;
		margin-inline: auto;
		display: flex;
		flex-direction: column;
		row-gap: 2rem;
	}

	label,
	input[type='file'] {
		display: block;
		font-weight: 700;
	}

	button {
		font: inherit;
		cursor: pointer;
	}

	.files {
		padding: 0;
	}

	.files > li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: 0.5rem;
	}

	.files > li:hover {
		background-color: hsla(0, 0%, 0%, 0.1) ;
	}
</style>
