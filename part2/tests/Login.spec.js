import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';


test("User can login with valid credentials successfully", async ({page}) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();
    

    await loginPage.login(
        process.env.TRUPEER_EMAIL,
        process.env.TRUPEER_PASSWORD
    );
    
    await loginPage.closePopupIfPresent();

    await expect(page).not.toHaveURL(/auth/);

    await expect(page.getByText('How would you like to get started?')).toBeVisible();
     // Ensure the user is redirected away from the login page after successful login
})

