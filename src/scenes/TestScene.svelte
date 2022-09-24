<script lang="ts">
  import { spring } from 'svelte/motion';

  export let name: string;
  export let config: {
    framerate: number;
    resolution: {
      width: number;
      height: number;
    };
  } = {
    framerate: 22,
    resolution: {
      width: 1920,
      height: 1080
    }
  };

  const coords = spring(
    { x: -config.resolution.width / 2, y: config.resolution.height / 2 },
    {
      stiffness: 0.05,
      damping: 0.1
    }
  );

  coords.set({ x: config.resolution.width / 2, y: config.resolution.height / 2 });
</script>

<main>
  <h1 style:left="{$coords.x}px" style:top="{$coords.y}px">{name}</h1>
</main>

<style>
  h1 {
    position: fixed;
    display: block;
    margin: 0;
    font-family: monospace;
    font-size: 3rem;
    line-height: 1;
    color: orangered;
    transform: translate(-50%, -100%);
  }

  main {
    width: 100vw;
    height: 100vh;
    background: rgb(30 30 30);
  }
</style>
