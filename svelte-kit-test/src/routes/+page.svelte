<script>
	import { enhance } from '$app/forms';

	export let form;
</script>

{#if form?.success}
	<p style="font-weight: bold; color: darkgreen;">Success</p>
{/if}

<form method="POST" action="?/create" enctype="application/x-www-form-urlencoded" use:enhance>
	<div>
		<label for="text">Input some text</label>
		<input type="text" name="text" required />
	</div>
	<button>Submit</button>
</form>
