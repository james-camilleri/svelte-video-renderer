import type { PlaywrightTestConfig } from '@playwright/test';

const PORT = 4173;

const config: PlaywrightTestConfig = {
	timeout: 5 * 60 * 1000,
	fullyParallel: true,
	use: {
		baseURL: `http://localhost:${PORT}`
	},
	webServer: {
		command: 'npm run build && npm run preview',
		port: PORT
	}
};

export default config;
