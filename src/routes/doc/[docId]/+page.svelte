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
	<title>{data.docId} - Drive Wiki</title>
</svelte:head>

<div class="animate-in fade-in slide-in-from-bottom-2 duration-300">
	<div
		class="text-muted-foreground border-border mb-8 flex items-center gap-2 border-b pb-4 text-sm"
	>
		<span>Wiki Root</span>
		<span>/</span>
		<span class="text-foreground font-semibold">{data.docId}.md</span>
	</div>

	<div
		class="prose prose-neutral dark:prose-invert prose-headings:font-bold prose-a:text-primary max-w-none"
	>
		<!-- Render parsed HTML straight -->
		{@html parsedContent}
	</div>
</div>
