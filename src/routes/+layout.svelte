<script lang="ts">
  import '../app.css';
  import SearchModal from '$lib/components/SearchModal.svelte';
  import LoginModal from '$lib/components/LoginModal.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';

  let { children } = $props();
  let searchOpen = $state(false);
  let loginModalOpen = $state(false);

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
  <Sidebar bind:loginModalOpen />

  <!-- Main Content Area -->
  <main class="flex min-w-0 flex-1 flex-col">
    <!-- Header -->
    <Header bind:searchOpen />

    <div class="custom-scrollbar flex w-full flex-1 justify-center overflow-y-auto p-4 sm:p-8">
      <div class="w-full max-w-4xl max-w-none">
        {@render children()}
      </div>
    </div>
  </main>

  <SearchModal bind:isOpen={searchOpen} />
  <LoginModal bind:isOpen={loginModalOpen} />
</div>
