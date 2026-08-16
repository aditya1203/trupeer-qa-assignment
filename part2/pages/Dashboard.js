import {expect} from '@playwright/test';

export class DashboardPage {
    constructor(page) {
        this.page = page;

        this.videoCard = page
        .locator('div.group\\/card')
        .filter({
        hasText: 'Trupeer.ai Basic Video Editing Guide'
         })
         .locator('a[href*="/video/edit"]');
        this.card= page.getByRole('button', { name: 'Trupeer.ai Basic Video' });
    }

    async openVideoCard() {
        await this.card.click();
    }
}