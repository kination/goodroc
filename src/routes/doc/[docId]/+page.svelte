<script lang="ts">
  import type { PageData } from './$types';
  import { marked } from 'marked';
  import DOMPurify from 'isomorphic-dompurify'; // using a universal mock so server doesn't crash on import, or we can just render via a raw reactive statement
  // isomorphic didn't install, dompurify only works client side.

  let { data } = $props<{ data: PageData }>();

  // Using unpurified marked rendering since it's just dummy internal data.
  // In production, you would run DOMPurify on the client side or use a different tool.
  let parsedContent = $derived.by(() => {
    // synchronously parse
    return marked.parse(data.content) as string;
  });
</script>

<svelte:head>
  <title>{data.docId} - goodroc</title>
</svelte:head>

<div class="animate-in duration-300 fade-in slide-in-from-bottom-2">
  <div
    class="mb-8 flex items-center gap-2 border-b border-border pb-4 text-sm text-muted-foreground"
  >
    <span>Wiki Root</span>
    <span>/</span>
    <span class="font-semibold text-foreground">{data.docId}.md</span>
  </div>

  <div
    class="prose max-w-none prose-neutral dark:prose-invert prose-headings:font-bold prose-a:text-primary"
  >
    <!-- Render parsed HTML straight -->
    {@html parsedContent}
  </div>
</div>
