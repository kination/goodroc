<script lang="ts">
  import { page } from '$app/state';
  import { Folder, FileText, LogOut, LogIn, User } from 'lucide-svelte';
  import { authStore } from '$lib/auth.svelte';

  let { loginModalOpen = $bindable(false) } = $props<{ loginModalOpen: boolean }>();
</script>

<aside class="hidden w-64 flex-col border-r border-border bg-card md:flex">
  <div class="flex items-center gap-2 border-b border-border p-4 text-lg font-bold">
    <Folder class="h-5 w-5 text-primary" />
    goodroc
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
      <div class="flex items-center gap-3 rounded-md bg-muted/50 p-2">
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <User class="h-4 w-4 text-primary" />
        </div>
        <div class="flex flex-1 flex-col overflow-hidden leading-tight">
          <span class="truncate text-sm font-medium">{authStore.user.name}</span>
          <span class="truncate text-xs text-muted-foreground">{authStore.user.email}</span>
        </div>
        <button
          onclick={() => authStore.logout()}
          class="rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Log out"
        >
          <LogOut class="h-4 w-4" />
        </button>
      </div>
    {:else}
      <button
        onclick={() => (loginModalOpen = true)}
        class="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <LogIn class="h-4 w-4" />
        Google Login
      </button>
    {/if}
  </div>
</aside>
