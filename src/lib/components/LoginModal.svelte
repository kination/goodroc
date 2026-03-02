<script lang="ts">
  import { LogIn } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { authStore } from '$lib/auth.svelte';

  let { isOpen = $bindable(false) } = $props<{ isOpen: boolean }>();

  let isLoggingIn = $state(false);
  let rootFolderId = $state('');
  let tokenClient: any;

  async function handleAuthSuccess(accessToken: string) {
    try {
      // Get user info from Google API
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const userData = await response.json();

      authStore.login(rootFolderId, accessToken);
      // Update with real data
      authStore.user = {
        name: userData.name,
        email: userData.email
      };

      isOpen = false;
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    } finally {
      isLoggingIn = false;
    }
  }

  function initGoogleClient(): boolean {
    const google = (window as any).google;
    if (typeof google === 'undefined') return false;

    if (!tokenClient) {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope:
          'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        callback: (tokenResponse: any) => {
          if (tokenResponse && tokenResponse.access_token) {
            handleAuthSuccess(tokenResponse.access_token);
          } else {
            isLoggingIn = false; // Reset if user closed the popup
          }
        },
        error_callback: (error: any) => {
          console.error('Google OAuth Error:', error);
          isLoggingIn = false;
        }
      });
    }
    return true;
  }

  onMount(() => {
    // Attempt early initialization
    initGoogleClient();
  });

  function handleGoogleLogin() {
    isLoggingIn = true;

    // Attempt initialization again in case script loaded late
    const isGoogleReady = initGoogleClient();

    if (isGoogleReady && tokenClient) {
      tokenClient.requestAccessToken();
    } else {
      console.error(
        'Google token client is not initialized. Please check network or script block blockers.'
      );
      isLoggingIn = false;
    }
  }
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

        <div class="mt-2 w-full text-left">
          <label for="root-folder" class="mb-1 block text-sm font-medium text-foreground">
            Team Directory/Folder ID (Optional)
          </label>
          <input
            id="root-folder"
            type="text"
            bind:value={rootFolderId}
            placeholder="e.g. 1A2b3C4d5E6f_TeamDriveId"
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
          />
          <p class="mt-1 text-xs text-muted-foreground">
            Leave blank to connect your entire root drive, or specify a folder ID to use it as the
            workspace root.
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
