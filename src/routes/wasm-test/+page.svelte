<script lang="ts">
  import { onMount } from 'svelte';

  // dynamic loading to prevent SSR error
  let greetingMsg = $state('WASM initialize...');

  onMount(async () => {
    try {
      // Load build wasm module, created by 'npm run build:wasm'
      const wasm = await import('$lib/wasm/wasm_core.js');
      await wasm.default();

      greetingMsg = wasm.greet('Rust WASM');
    } catch (err) {
      console.error(err);
      greetingMsg = 'WASM load failed. Confirm `npm run build:wasm` has been triggered';
    }
  });
</script>

<div class="p-8">
  <h1 class="mb-4 text-2xl font-bold">WASM test</h1>
  <div class="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
    <p class="font-mono text-lg text-blue-600 dark:text-blue-400">
      {greetingMsg}
    </p>
  </div>
</div>
