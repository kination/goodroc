<script lang="ts">
  import { LogIn } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { authStore } from '$lib/auth.svelte';

  let { isOpen = $bindable(false) } = $props<{ isOpen: boolean }>();

  let isLoggingIn = $state(false);

  function handleGoogleLogin() {
    isLoggingIn = true;

    // TODO: Replace with actual Google OAuth integration (Google Identity Services)
    setTimeout(() => {
      authStore.login();
      isLoggingIn = false;
      isOpen = false;
    }, 1500);
  }

  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) isOpen = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 flex animate-in items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-300 fade-in"
    onclick={() => (isOpen = false)}
  >
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="relative mx-4 w-full max-w-sm animate-in overflow-hidden rounded-xl border border-border bg-card p-6 text-card-foreground shadow-lg zoom-in-95"
      onclick={(e) => e.stopPropagation()}
    >
      <div class="flex flex-col items-center gap-4 text-center">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <LogIn class="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 class="text-xl font-bold tracking-tight">Sign in with Google</h2>
          <p class="mt-2 text-sm text-muted-foreground">
            Authenticate to sync your Google Drive markdown documents and use Gemini.
          </p>
        </div>
        <button
          onclick={handleGoogleLogin}
          disabled={isLoggingIn}
          class="mt-4 flex w-full items-center justify-center gap-3 rounded-md border border-border bg-background px-4 py-2 font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          <!-- svelte-ignore a11y_missing_attribute -->
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            class="h-5 w-5"
            alt="Google Logo"
          />
          {isLoggingIn ? 'Authenticating...' : 'Continue with Google'}
        </button>
      </div>
    </div>
  </div>
{/if}
