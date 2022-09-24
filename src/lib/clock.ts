import type FakeTimers from '@sinonjs/fake-timers';
import { writable } from 'svelte/store';

export const clock = writable<FakeTimers.InstalledClock | undefined>();
