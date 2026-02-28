<script lang="ts">
  import { Menu, Search } from 'lucide-svelte';
  import { authStore } from '$lib/auth.svelte';

  let { searchOpen = $bindable(false) } = $props<{ searchOpen: boolean }>();
</script>

<header
  class="flex h-14 items-center justify-between border-b border-border bg-background px-4 sm:px-6"
>
  <div class="flex items-center gap-4">
    <button class="text-muted-foreground hover:text-foreground md:hidden">
      <Menu class="h-5 w-5" />
    </button>
    <button
      onclick={() => (searchOpen = true)}
      class="hidden w-64 items-center gap-2 rounded-md border border-border bg-muted px-3 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted/80 sm:flex"
    >
      <Search class="h-4 w-4" />
      <span>Search documentation...</span>
      <kbd
        class="pointer-events-none ml-auto inline-flex h-5 items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 select-none"
      >
        <span class="text-xs">⌘</span>K
      </kbd>
    </button>
  </div>
  <div class="flex items-center">
    {#if authStore.user}
      <span
        class="hidden rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium whitespace-nowrap text-green-500 sm:block"
        >Drive Connected</span
      >
    {/if}
  </div>
</header>
