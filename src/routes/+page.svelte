<script lang="ts">
  import { authStore } from '$lib/auth.svelte';
  import { FolderOpen } from 'lucide-svelte';
</script>

<svelte:head>
  <title>goodroc Home</title>
</svelte:head>

{#if !authStore.user}
  <div class="flex h-full flex-col items-center justify-center pt-16 text-center">
    <h1 class="mb-4 text-3xl font-bold tracking-tight">Welcome to SvelteKit goodroc</h1>
    <p class="mb-8 max-w-lg text-lg text-muted-foreground">
      Sign in with Google to sync your Google Drive markdown documents and use our Gemini Gems
      integration.
    </p>
    <div class="grid w-full max-w-2xl grid-cols-1 gap-4 text-left md:grid-cols-2">
      <div class="rounded-lg border border-border bg-card p-4 text-card-foreground">
        <h3 class="mb-2 font-semibold">Google Drive SSOT</h3>
        <p class="text-sm text-muted-foreground">
          All files are natively maintained in your Drive.
        </p>
      </div>
      <div class="rounded-lg border border-border bg-card p-4 text-card-foreground">
        <h3 class="mb-2 font-semibold">Instant WASM Search</h3>
        <p class="text-sm text-muted-foreground">
          Press Cmd+K to test the skeleton search interface.
        </p>
      </div>
    </div>
  </div>
{:else}
  <div class="flex h-full flex-col items-center justify-center pt-16 text-center">
    <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
      <FolderOpen class="h-8 w-8 text-primary" />
    </div>
    <h1 class="mb-2 text-2xl font-bold tracking-tight">Viewing Drive Root</h1>
    <p class="mb-8 text-muted-foreground">
      Connected to folder: <span class="font-mono text-foreground"
        >{authStore.rootFolderId || 'Default Root'}</span
      >
    </p>
    <div class="max-w-md text-sm text-muted-foreground">
      <p>
        Select a document from the sidebar to start editing. All changes will be synced
        automatically.
      </p>
    </div>
  </div>
{/if}
