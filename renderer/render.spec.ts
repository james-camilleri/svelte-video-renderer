import fs from 'fs';

import { test } from '@playwright/test';
import { execa } from 'execa';

import config, { type Scenes } from './config.js';

async function render(scenes: Scenes, config?: { framerate: number; resolution: { width: number; height: number } }) {
  const { framerate = 60, resolution = { width: 1280, height: 720 } } = config || {};

  const OUTPUT_DIR = 'output';

  const renders = Object.entries(scenes)
    .map(([name, { length, data }]) => {
      return data && data.length > 0
        ? data.map((params) => ({
            scene: name,
            filename: `${name}-${Object.values(params)[0].replace(' ', '-')}`,
            query: new URLSearchParams({ ...params, config: JSON.stringify(config) }),
            length
          }))
        : [
            {
              scene: name,
              filename: name,
              query: new URLSearchParams({ config: JSON.stringify(config) }),
              length
            }
          ];
    })
    .flat();

  renders.forEach(({ scene, filename, query, length }, i) => {
    const frames = framerate * length;

    for (let j = 0; j < frames; j++) {
      test(`${filename}: rendering frame ${j}`, async ({ page }) => {
        await page.setViewportSize(resolution);
        await page.goto(`/render/${scene}/${j}?${query}`);
        await page.waitForEvent('console');
        await page.screenshot({ path: `output/frames/${filename}-${i}/${j}.png` });
      });
    }
  });

  test.afterAll(async () => {
    await Promise.all(
      renders.map(async ({ filename }, i) =>
        execa(
          'ffmpeg',
          [
            '-framerate',
            String(framerate),
            '-i',
            `frames/${filename}-${i}/%d.png`, // Input files
            '-c:v',
            'libx264', // Codec
            '-y', // Overwrite existing files
            `${filename}.mp4` // Output file
          ],
          { cwd: OUTPUT_DIR }
        )
      )
    );

    fs.rmSync(`${OUTPUT_DIR}/frames`, { recursive: true, force: true });
  });
}

const { scenes, ...renderConfig } = config;
render(scenes, renderConfig);
