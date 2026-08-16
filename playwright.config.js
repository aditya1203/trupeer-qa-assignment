import 'dotenv/config';
import {defineConfig} from '@playwright/test';

export default defineConfig({

    testDir: './part2/tests',

    timeout: 30 * 1000,

    expect: {
        timeout: 5000
    },

    use: {
        baseURL: 'https://www.trupeer.ai',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        viewport: {
        width: 1920,
        height: 1080
                }
    },

    reporter: [
        ['list'],
        ['html', {open: 'never'}]
    ]
});