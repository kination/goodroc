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
    ChevronDown,
    Loader2
  } from 'lucide-svelte';
  import { authStore } from '$lib/auth.svelte';
  import { fetchDriveHierarchy, type DriveFile } from '$lib/drive';
  import { onMount } from 'svelte';

  let { loginModalOpen = $bindable(false) } = $props<{ loginModalOpen: boolean }>();

  let rootItems = $state<DriveFile[]>([]);
  let isLoading = $state(false);
  let fetchError = $state<string | null>(null);

  // Simplified state to track open folders
  let openFolders = $state<Record<string, boolean>>({});

  function toggleFolder(folderId: string) {
    openFolders[folderId] = !openFolders[folderId];
    if (openFolders[folderId]) {
      loadSubFolder(folderId);
    }
  }

  async function loadSubFolder(folderId: string) {
    if (!authStore.accessToken) return;

    // Find the folder recursively
    const updateChildren = (items: DriveFile[]): boolean => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === folderId) {
          if (!items[i].children) {
            // Fetch children if they don't exist yet
            fetchDriveHierarchy(folderId, authStore.accessToken!).then((children) => {
              items[i].children = children;
              rootItems = [...rootItems]; // Trigger reactivity
            });
          }
          return true;
        }
        if (items[i].children && updateChildren(items[i].children!)) {
          return true;
        }
      }
      return false;
    };

    updateChildren(rootItems);
  }

  import { untrack } from 'svelte';

  function initDriveFetch() {
    if (rootItems.length > 0 || isLoading) return;

    isLoading = true;
    fetchError = null;
    fetchDriveHierarchy(authStore.rootFolderId!, authStore.accessToken!)
      .then((files) => {
        rootItems = files;
        // set root folder as technically open
        openFolders[authStore.rootFolderId!] = true;
      })
      .catch((err) => {
        fetchError = err.message;
      })
      .finally(() => {
        isLoading = false;
      });
  }

  $effect(() => {
    // Watch for login changes by explicitly reading authStore properties
    const user = authStore.user;
    const token = authStore.accessToken;
    const folderId = authStore.rootFolderId;

    if (user && token && folderId) {
      // Use untrack so mutations to loading/error/items don't re-trigger this effect
      untrack(() => {
        initDriveFetch();
      });
    } else {
      untrack(() => {
        rootItems = [];
        openFolders = {};
        fetchError = null;
      });
    }
  });
</script>

<aside class="hidden w-64 flex-col border-r border-border bg-card md:flex">
  <div class="flex items-center gap-2 border-b border-border p-4 text-lg font-bold">
    <Folder class="h-5 w-5 text-primary" />
    goodroc
  </div>
  <div class="flex-1 space-y-1 overflow-y-auto p-3">
    {#if authStore.user}
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

      <!-- Recursive Snippet for Drive Hierarchy -->
      {#snippet driveNode(item: DriveFile, level: number = 0)}
        {#if item.mimeType === 'application/vnd.google-apps.folder'}
          <div
            role="button"
            tabindex="0"
            style="outline: none"
            class="group mt-0.5 flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 font-medium text-foreground transition-colors hover:bg-muted"
            onclick={() => toggleFolder(item.id)}
            onkeydown={(e) => e.key === 'Enter' && toggleFolder(item.id)}
          >
            {#if openFolders[item.id]}
              <ChevronDown class="h-4 w-4 shrink-0 text-muted-foreground/70" />
            {:else}
              <ChevronRight class="h-4 w-4 shrink-0 text-muted-foreground/70" />
            {/if}
            <FolderOpen class="h-4 w-4 shrink-0 text-primary/80" />
            <span class="truncate select-none">{item.name}</span>
          </div>

          {#if openFolders[item.id]}
            <div class="relative ml-4 space-y-0.5 border-l border-border pl-2">
              {#if !item.children}
                <div class="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground">
                  <Loader2 class="h-3 w-3 animate-spin" /> Loading...
                </div>
              {:else if item.children.length === 0}
                <div class="px-2 py-1 text-xs text-muted-foreground/50 italic">Empty folder</div>
              {:else}
                {#each item.children as child (child.id)}
                  {@render driveNode(child, level + 1)}
                {/each}
              {/if}
            </div>
          {/if}
        {:else}
          <a
            href="/doc/{item.id}"
            class="group mt-0.5 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted {page
              .url.pathname === `/doc/${item.id}`
              ? 'bg-secondary font-semibold text-primary'
              : 'text-muted-foreground'}"
          >
            <FileText class="h-4 w-4 shrink-0" />
            <span class="truncate">{item.name.replace('.md', '')}</span>
          </a>
        {/if}
      {/snippet}

      <!-- Tree Root -->
      <div class="space-y-0.5 font-sans text-sm">
        <div
          role="button"
          tabindex="0"
          style="outline: none"
          class="group flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 font-medium text-foreground transition-colors hover:bg-muted"
        >
          <ChevronDown class="h-4 w-4 shrink-0 text-muted-foreground/70" />
          <FolderOpen class="h-4 w-4 shrink-0 text-primary/80" />
          <span class="truncate select-none"
            >{import.meta.env.VITE_GOOGLE_DRIVE_ROOT_FOLDER_NAME || 'Wiki Root'}</span
          >
        </div>

        <div class="relative ml-4 space-y-0.5 border-l border-border pl-2">
          {#if isLoading}
            <div class="flex items-center gap-2 px-2 py-4 text-sm text-muted-foreground">
              <Loader2 class="h-4 w-4 animate-spin" /> Syncing drive...
            </div>
          {:else if fetchError}
            <div class="px-2 py-4 text-xs text-red-500">
              Error loading drive: {fetchError}
            </div>
          {:else if rootItems.length === 0}
            <div class="px-2 py-4 text-xs text-muted-foreground italic">No files found.</div>
          {:else}
            {#each rootItems as item (item.id)}
              {@render driveNode(item)}
            {/each}
          {/if}
        </div>
      </div>
    {/if}
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
