<script context="module">
	import { writable } from 'svelte/store';

	const { subscribe, update } = writable([]);

	export const toasts = {
		subscribe,

		show({ type, text, html, dismiss_after = 3000 }) {
			update((toasts) => [...toasts, { type, text, html, dismiss_after }]);
		},

		success(text, dismiss_after) {
			this.show({ type: 'success', text, dismiss_after });
		},

		error(text, dismiss_after) {
			this.show({ type: 'error', text, dismiss_after });
		},

		dismiss(toast) {
			update((toasts) => toasts.filter((t) => t !== toast));
		},

		dismiss_all() {
			update(() => []);
		}
	};
</script>

<script>
	export let position = 'top';

	import { fly, fade } from 'svelte/transition';

	function dismiss_after(_, toast) {
		toast.dismiss_after && setTimeout(() => toasts.dismiss(toast), toast.dismiss_after);
	}
</script>

<ol class="toasts" class:-top={position === 'top'} class:-bottom={position === 'bottom'}>
	{#each $toasts as toast (toast)}
		<li
			class="toast"
			class:--success={toast.type === 'success'}
			class:--error={toast.type === 'error'}
			in:fly={{ y: -100, duration: 200 }}
			out:fade={{ duration: 200 }}
			use:dismiss_after={toast}
		>
			{#if toast.html}
				{@html toast.html}
			{:else if toast.text}
				<p class="content">
					<svg viewBox="0 0 24 24" class="icon">
						{#if toast.type === 'success'}
							<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
							<polyline points="22 4 12 14.01 9 11.01" />
						{:else if toast.type === 'error'}
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="8" x2="12" y2="12" />
							<line x1="12" y1="16" x2="12.01" y2="16" />
						{/if}
					</svg>

					<span class="text">{toast.text}</span>
				</p>
			{/if}
		</li>
	{/each}
</ol>

<style>
	* {
		box-sizing: border-box;
	}

	.toasts {
		padding: 0 1em;
		margin: 0 auto;
		position: fixed;
		left: 0;
		width: 100%;
		pointer-events: none;
	}

	.toasts.-top {
		top: 0;
	}

	.toasts.-bottom {
		bottom: 0;
	}

	.toast {
		padding: 1em;
		border-radius: 0.25em;
		margin: 0.5em auto;
		max-width: 40ch;
		color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		pointer-events: auto;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	}

	.toast.--error {
		background-color: #ba135d;
	}

	.toast.--success {
		background-color: #1eae98;
	}

	.content {
		margin: 0;
		display: flex;
		align-items: center;
	}

	.icon {
		width: 1.5em;
		height: 1.5em;
		fill: none;
		stroke: currentColor;
		stroke-width: 0.125em;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.text {
		margin: 0 1em;
		font-weight: bold;
		font-family: sans-serif;
	}

	.dismiss-btn {
		padding: 0;
		border: none;
		margin: 0;
		appearance: none;
		font-size: inherit;
		color: inherit;
		background: none;
		cursor: pointer;
	}

	.dismiss-btn:active {
		background: none;
	}
</style>
