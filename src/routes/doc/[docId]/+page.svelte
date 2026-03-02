<script lang="ts">
  import type { PageData } from './$types';
  import { marked } from 'marked';
  import { authStore } from '$lib/auth.svelte';
  import { fetchFileContent } from '$lib/drive';
  import { Loader2, AlertCircle, FileText } from 'lucide-svelte';
  import { untrack } from 'svelte';

  let { data } = $props<{ data: PageData }>();

  let content = $state('');
  let isLoading = $state(false);
  let fetchError = $state<string | null>(null);

  async function loadContent() {
    if (!authStore.accessToken) return;

    isLoading = true;
    fetchError = null;
    try {
      content = await fetchFileContent(data.docId, authStore.accessToken);
    } catch (err: any) {
      fetchError = err.message || 'Failed to fetch document content.';
      content = '';
    } finally {
      isLoading = false;
    }
  }

  $effect(() => {
    // Re-fetch when docId or accessToken changes
    const docId = data.docId;
    const token = authStore.accessToken;

    if (docId && token) {
      untrack(() => {
        loadContent();
      });
    }
  });

  let parsedContent = $derived.by(() => {
    if (!content) return '';
    return marked.parse(content) as string;
  });
</script>

<svelte:head>
  <title>{data.docId} - goodroc</title>
</svelte:head>

<div class="animate-in duration-300 fade-in slide-in-from-bottom-2">
  <div
    class="mb-8 flex items-center gap-2 border-b border-border pb-4 text-sm text-muted-foreground"
  >
    <FileText class="h-4 w-4" />
    <span>Wiki Root</span>
    <span>/</span>
    <span class="max-w-[200px] truncate font-semibold text-foreground">{data.docId}</span>
  </div>

  {#if isLoading}
    <div class="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
      <Loader2 class="h-8 w-8 animate-spin text-primary" />
      <p class="animate-pulse text-sm font-medium">Fetching content from Google Drive...</p>
    </div>
  {:else if fetchError}
    <div
      class="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 py-20 text-destructive"
    >
      <AlertCircle class="h-10 w-10" />
      <div class="text-center">
        <p class="font-bold">Error loading document</p>
        <p class="text-sm opacity-80">{fetchError}</p>
      </div>
      <button
        onclick={loadContent}
        class="text-destructive-foreground mt-2 rounded-md bg-destructive px-4 py-2 text-sm font-medium hover:bg-destructive/90"
      >
        Retry
      </button>
    </div>
  {:else if content}
    <div
      class="prose max-w-none prose-neutral dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-pre:bg-muted prose-pre:text-muted-foreground prose-img:rounded-xl"
    >
      {@html parsedContent}
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center py-20 text-muted-foreground">
      <p>No content to display or authentication required.</p>
    </div>
  {/if}
</div>
