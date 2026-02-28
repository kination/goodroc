<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import { Folder, FileText, Menu, Search, LogOut, LogIn } from 'lucide-svelte';
  import { authStore } from '$lib/auth.svelte';
  import SearchModal from '$lib/components/SearchModal.svelte';

  let { children } = $props();
  let searchOpen = $state(false);

  $effect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchOpen = true;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
</script>

<div class="flex h-screen w-full overflow-hidden bg-background text-foreground">
  <!-- Sidebar -->
  <aside class="hidden w-64 flex-col border-r border-border bg-card md:flex">
    <div class="flex items-center gap-2 border-b border-border p-4 text-lg font-bold">
      <Folder class="h-5 w-5 text-primary" />
      Drive Wiki
    </div>
    <div class="flex-1 space-y-2 overflow-y-auto p-4">
      <div class="mb-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        Wiki Root
      </div>

      <a
        href="/doc/getting-started"
        class="flex cursor-pointer items-center gap-2 rounded p-2 text-sm transition-colors hover:bg-muted {page
          .url.pathname === '/doc/getting-started'
          ? 'bg-secondary font-semibold text-primary'
          : ''}"
      >
        <FileText class="h-4 w-4 text-muted-foreground" />
        getting-started.md
      </a>
      <a
        href="/doc/architecture"
        class="flex cursor-pointer items-center gap-2 rounded p-2 text-sm transition-colors hover:bg-muted {page
          .url.pathname === '/doc/architecture'
          ? 'bg-secondary font-semibold text-primary'
          : ''}"
      >
        <FileText class="h-4 w-4 text-muted-foreground" />
        architecture.md
      </a>
      <a
        href="/doc/api-guide"
        class="flex cursor-pointer items-center gap-2 rounded p-2 text-sm transition-colors hover:bg-muted {page
          .url.pathname === '/doc/api-guide'
          ? 'bg-secondary font-semibold text-primary'
          : ''}"
      >
        <FileText class="h-4 w-4 text-muted-foreground" />
        api-guide.md
      </a>
    </div>
    <div class="border-t border-border p-4">
      {#if authStore.user}
        <div class="flex items-center justify-between">
          <span class="truncate text-sm font-medium">{authStore.user.name}</span>
          <button
            onclick={() => authStore.logout()}
            class="mr-[-8px] rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut class="h-4 w-4" />
          </button>
        </div>
      {:else}
        <button
          onclick={() => authStore.login()}
          class="flex h-9 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <LogIn class="h-4 w-4" />
          Google Login
        </button>
      {/if}
    </div>
  </aside>

  <!-- Main Content Area -->
  <main class="flex min-w-0 flex-1 flex-col">
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

    <div class="custom-scrollbar flex w-full flex-1 justify-center overflow-y-auto p-4 sm:p-8">
      <div class="w-full max-w-4xl max-w-none">
        {@render children()}
      </div>
    </div>
  </main>

  <SearchModal bind:isOpen={searchOpen} />
</div>
