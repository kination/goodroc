<script lang="ts">
  // Home Page for SvelteKit
</script>

<svelte:head>
  <title>Drive Wiki Home</title>
</svelte:head>

<div class="flex h-full flex-col items-center justify-center pt-16 text-center">
  <h1 class="mb-4 text-3xl font-bold tracking-tight">Welcome to SvelteKit Drive Wiki</h1>
  <p class="mb-8 max-w-lg text-lg text-muted-foreground">
    Select a document from the sidebar to view it. Changes will automatically sync with Google Drive
    using our Gemini Gems integration.
  </p>
  <div class="grid w-full max-w-2xl grid-cols-1 gap-4 text-left md:grid-cols-2">
    <div class="rounded-lg border border-border bg-card p-4 text-card-foreground">
      <h3 class="mb-2 font-semibold">Google Drive SSOT</h3>
      <p class="text-sm text-muted-foreground">All files are natively maintained in Drive.</p>
    </div>
    <div class="rounded-lg border border-border bg-card p-4 text-card-foreground">
      <h3 class="mb-2 font-semibold">Instant WASM Search</h3>
      <p class="text-sm text-muted-foreground">
        Press Cmd+K to test the skeleton search interface.
      </p>
    </div>
  </div>
</div>
