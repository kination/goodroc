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
    class="fixed inset-0 z-50 flex animate-in items-start justify-center bg-background/80 pt-[20vh] backdrop-blur-sm fade-in sm:pt-[10vh]"
    onclick={() => (isOpen = false)}
  >
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="relative mx-4 w-full max-w-xl animate-in overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg duration-200 zoom-in-95"
      onclick={(e) => e.stopPropagation()}
    >
      <div class="flex items-center border-b px-3">
        <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          bind:this={searchInput}
          bind:value={query}
          class="flex h-12 w-full border-0 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search documentation (WASM powered)..."
        />
        <kbd
          class="pointer-events-none hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground uppercase opacity-100 select-none sm:inline-flex"
        >
          ESC
        </kbd>
      </div>
      <div class="max-h-[300px] overflow-x-hidden overflow-y-auto p-2 text-sm">
        {#if query}
          <div
            class="flex cursor-pointer items-center rounded-sm px-2 py-2.5 text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground"
          >
            <div class="flex w-full flex-col gap-1">
              <span class="font-medium text-primary">Dummy Result for "{query}"</span>
              <span class="w-fit rounded bg-muted px-1 text-xs text-muted-foreground"
                >src/dummy-docs/getting-started.md</span
              >
            </div>
          </div>
        {:else}
          <div class="p-4 text-center text-sm text-muted-foreground">
            Type something to search...
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
