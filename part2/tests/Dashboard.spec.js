import {test,expect} from '@playwright/test';

import {LoginPage} from '../pages/LoginPage';
import {DashboardPage} from '../pages/Dashboard';

test("User can open the video card on the dashboard", async ({page}) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);  

    await loginPage.open();
    await loginPage.login(
        process.env.TRUPEER_EMAIL,
        process.env.TRUPEER_PASSWORD 
    );
    await loginPage.closePopupIfPresent();
    await expect(page).not.toHaveURL(/auth/);
    await expect(page.getByText('How would you like to get started?')).toBeVisible();
    await dashboardPage.openVideoCard();


})