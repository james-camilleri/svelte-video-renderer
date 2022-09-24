<script lang="ts">
  import FakeTimers from '@sinonjs/fake-timers';
  import { page } from '$app/stores';
  import { clock } from '$lib/clock';

  if ($page.params.action === 'render' && !$clock) {
    $clock = FakeTimers.install();
  }

  if ($page.params.action !== 'render' && $clock) {
    $clock.uninstall();
    $clock = undefined;
  }
</script>

<slot />
