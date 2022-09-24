<script lang="ts">
  import { page } from '$app/stores';
  import { clock } from '$lib/clock';
  import { onMount } from 'svelte';
  import * as scenes from '$scenes';

  const { params, url } = $page;
  const [sceneName, frame] = params.scene.split('/');
  const scene = scenes[sceneName];
  const props = Object.fromEntries(url.searchParams);
  const config = JSON.parse(props?.config);

  onMount(() => {
    if (frame !== undefined) {
      // Assume 60fps if not given.
      const framerate = config?.framerate ?? 60;

      $clock?.tick((1000 / framerate) * +frame);
      console.log('rendered');
    }
  });
</script>

<svelte:component this={scene} {...props} {config} />
