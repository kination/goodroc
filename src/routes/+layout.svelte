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

<div class="bg-background text-foreground flex h-screen w-full overflow-hidden">
	<!-- Sidebar -->
	<aside class="border-border bg-card hidden w-64 flex-col border-r md:flex">
		<div class="border-border flex items-center gap-2 border-b p-4 text-lg font-bold">
			<Folder class="text-primary h-5 w-5" />
			Drive Wiki
		</div>
		<div class="flex-1 space-y-2 overflow-y-auto p-4">
			<div class="text-muted-foreground mb-4 text-xs font-semibold tracking-wider uppercase">
				Wiki Root
			</div>

			<a
				href="/doc/getting-started"
				class="hover:bg-muted flex cursor-pointer items-center gap-2 rounded p-2 text-sm transition-colors {page
					.url.pathname === '/doc/getting-started'
					? 'bg-secondary text-primary font-semibold'
					: ''}"
			>
				<FileText class="text-muted-foreground h-4 w-4" />
				getting-started.md
			</a>
			<a
				href="/doc/architecture"
				class="hover:bg-muted flex cursor-pointer items-center gap-2 rounded p-2 text-sm transition-colors {page
					.url.pathname === '/doc/architecture'
					? 'bg-secondary text-primary font-semibold'
					: ''}"
			>
				<FileText class="text-muted-foreground h-4 w-4" />
				architecture.md
			</a>
			<a
				href="/doc/api-guide"
				class="hover:bg-muted flex cursor-pointer items-center gap-2 rounded p-2 text-sm transition-colors {page
					.url.pathname === '/doc/api-guide'
					? 'bg-secondary text-primary font-semibold'
					: ''}"
			>
				<FileText class="text-muted-foreground h-4 w-4" />
				api-guide.md
			</a>
		</div>
		<div class="border-border border-t p-4">
			{#if authStore.user}
				<div class="flex items-center justify-between">
					<span class="truncate text-sm font-medium">{authStore.user.name}</span>
					<button
						onclick={() => authStore.logout()}
						class="text-muted-foreground hover:text-foreground hover:bg-muted mr-[-8px] rounded-full p-2 transition-colors"
					>
						<LogOut class="h-4 w-4" />
					</button>
				</div>
			{:else}
				<button
					onclick={() => authStore.login()}
					class="bg-primary text-primary-foreground hover:bg-primary/90 flex h-9 w-full items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors"
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
			class="border-border bg-background flex h-14 items-center justify-between border-b px-4 sm:px-6"
		>
			<div class="flex items-center gap-4">
				<button class="text-muted-foreground hover:text-foreground md:hidden">
					<Menu class="h-5 w-5" />
				</button>
				<button
					onclick={() => (searchOpen = true)}
					class="text-muted-foreground bg-muted hover:bg-muted/80 border-border hidden w-64 items-center gap-2 rounded-md border px-3 py-1.5 text-left text-sm transition-colors sm:flex"
				>
					<Search class="h-4 w-4" />
					<span>Search documentation...</span>
					<kbd
						class="bg-background text-muted-foreground pointer-events-none ml-auto inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none"
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
