<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { isOpen = $bindable(false) } = $props<{ isOpen: boolean }>();

	let query = $state('');
	let searchInput = $state<HTMLInputElement>();

	$effect(() => {
		if (isOpen) {
			console.log('Initializing WASM Search Engine (Orama)... [Skeleton]');
			// use a small timeout to allow modal transitions to complete before focusing
			setTimeout(() => searchInput?.focus(), 50);
		}
	});

	onMount(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) isOpen = false;
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="bg-background/80 animate-in fade-in fixed inset-0 z-50 flex items-start justify-center pt-[20vh] backdrop-blur-sm sm:pt-[10vh]"
		onclick={() => (isOpen = false)}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="bg-card text-card-foreground animate-in zoom-in-95 relative mx-4 w-full max-w-xl overflow-hidden rounded-xl border shadow-lg duration-200"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="flex items-center border-b px-3">
				<Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
				<input
					bind:this={searchInput}
					bind:value={query}
					class="placeholder:text-muted-foreground flex h-12 w-full border-0 bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Search documentation (WASM powered)..."
				/>
				<kbd
					class="bg-muted text-muted-foreground pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium uppercase opacity-100 select-none sm:inline-flex"
				>
					ESC
				</kbd>
			</div>
			<div class="max-h-[300px] overflow-x-hidden overflow-y-auto p-2 text-sm">
				{#if query}
					<div
						class="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center rounded-sm px-2 py-2.5 text-sm outline-none select-none"
					>
						<div class="flex w-full flex-col gap-1">
							<span class="text-primary font-medium">Dummy Result for "{query}"</span>
							<span class="text-muted-foreground bg-muted w-fit rounded px-1 text-xs"
								>src/dummy-docs/getting-started.md</span
							>
						</div>
					</div>
				{:else}
					<div class="text-muted-foreground p-4 text-center text-sm">
						Type something to search...
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
