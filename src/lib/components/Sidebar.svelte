<script lang="ts">
  import { page } from '$app/state';
  import {
    Folder,
    FolderOpen,
    FileText,
    LogOut,
    LogIn,
    User,
    ChevronRight,
    ChevronDown
  } from 'lucide-svelte';
  import { authStore } from '$lib/auth.svelte';

  let { loginModalOpen = $bindable(false) } = $props<{ loginModalOpen: boolean }>();
</script>

<aside class="hidden w-64 flex-col border-r border-border bg-card md:flex">
  <div class="flex items-center gap-2 border-b border-border p-4 text-lg font-bold">
    <Folder class="h-5 w-5 text-primary" />
    goodroc
  </div>
  <div class="flex-1 space-y-1 overflow-y-auto p-3">
    <div
      class="mb-2 flex items-center justify-between px-2 text-xs font-semibold tracking-wider text-muted-foreground"
    >
      <span class="uppercase">Wiki Root</span>
      {#if authStore.rootFolderId}
        <span
          class="ml-1 max-w-[100px] truncate rounded-sm bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary/70"
          title={authStore.rootFolderId}>{authStore.rootFolderId}</span
        >
      {/if}
    </div>

    <!-- Tree Root -->
    <div class="space-y-0.5 font-sans text-sm">
      <div
        class="group flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 font-medium text-foreground transition-colors hover:bg-muted"
      >
        <ChevronDown class="h-4 w-4 shrink-0 text-muted-foreground/70" />
        <FolderOpen class="h-4 w-4 shrink-0 text-primary/80" />
        <span class="truncate select-none"
          >{import.meta.env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_NAME || 'Wiki Root'}</span
        >
      </div>

      <!-- Nested Content -->
      <div class="relative ml-4 space-y-0.5 border-l border-border pl-2">
        <a
          href="/doc/getting-started"
          class="group flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted {page
            .url.pathname === '/doc/getting-started'
            ? 'bg-secondary font-semibold text-primary'
            : 'text-muted-foreground'}"
        >
          <FileText class="h-4 w-4 shrink-0" />
          <span class="truncate">getting-started.md</span>
        </a>

        <!-- Nested Folder -->
        <div
          class="group mt-1 flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 font-medium text-foreground transition-colors hover:bg-muted"
        >
          <ChevronDown class="h-4 w-4 shrink-0 text-muted-foreground/70" />
          <FolderOpen class="h-4 w-4 shrink-0 text-primary/80" />
          <span class="truncate select-none">api</span>
        </div>

        <!-- Double Nested Content -->
        <div class="relative ml-4 space-y-0.5 border-l border-border pl-2">
          <a
            href="/doc/architecture"
            class="group flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted {page
              .url.pathname === '/doc/architecture'
              ? 'bg-secondary font-semibold text-primary'
              : 'text-muted-foreground'}"
          >
            <FileText class="h-4 w-4 shrink-0" />
            <span class="truncate">architecture.md</span>
          </a>
          <a
            href="/doc/api-guide"
            class="group flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted {page
              .url.pathname === '/doc/api-guide'
              ? 'bg-secondary font-semibold text-primary'
              : 'text-muted-foreground'}"
          >
            <FileText class="h-4 w-4 shrink-0" />
            <span class="truncate">api-guide.md</span>
          </a>
        </div>
      </div>
    </div>
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
