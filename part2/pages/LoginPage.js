// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://app.trupeer.ai/auth?tab=signup');
//   await page.locator('.flex.w-full.items-center.border').first().click();
//   await page.getByRole('textbox', { name: 'Email' }).fill('nadefo8588@luhupo.com');
//   await page.getByRole('textbox', { name: 'Email' }).press('Tab');
//   await page.getByRole('textbox', { name: 'Password' }).fill('Abcdef123');
//   await page.getByRole('button', { name: 'Continue', exact: true }).click();
//   await page.locator('span').nth(1).click();
//   await page.getByRole('alert').filter({ hasText: 'User already exists, please' }).click();
//   await page.getByRole('button', { name: 'Go to login' }).click();
//   await page.getByRole('textbox', { name: 'Email' }).click({
//     modifiers: ['ControlOrMeta']
//   });
//   await page.getByRole('textbox', { name: 'Email' }).fill('nadefo8588@luhupo.com');
//   await page.getByRole('textbox', { name: 'Email' }).press('Tab');
//   await page.getByRole('textbox', { name: 'Password' }).fill('Abcdef123');
//   await page.getByRole('textbox', { name: 'Password' }).press('Enter');
//   await page.getByText('Forgot password?Continue').click();
//   await page.getByRole('button', { name: 'Continue', exact: true }).click();
//   await page.getByRole('button', { name: 'Take a Tour' }).click();
//   await page.getByRole('button', { name: 'Trupear.ai Web Application' }).click();
// });

import { expect } from '@playwright/test';

export class LoginPage {

    constructor(page) {
        this.page = page;

        this.loginButton = page.getByRole(
          'button', { name: 'Login', exact: true }
        );

        
        this.emailInput = page.getByRole(
          'textbox', { name: 'Email' }
        );

        this.passwordInput = page.getByRole(
          'textbox', { name: 'Password' }
        );  
        
        this.continueButton = page.getByRole(
          'button', { name: 'Continue', exact: true }
        );

        this.closeButton = page.getByRole('button', {
            name: 'Close'
        });
        this.welcomeBackText = page.getByText('Welcome back');
        this.forgotPassword = page.getByText('Forgot password?', {
         exact: true
      });
    }

    async open(){
      await this.page.goto('https://app.trupeer.ai/auth',
        {waitUntil: 'load'}
      );
     
      console.log("Url before login Click", this.page.url());

      // await this.page.evaluate(() => {
      //     document.body.style.zoom = '60%';
      // });
      await this.loginButton.waitFor({ state: 'attached' });
      await this.loginButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.loginButton.click();
      await this.welcomeBackText.waitFor({ state: 'visible', timeout: 10000});
      //await this.page.pause();

    }

    async login(email, password) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await expect(this.continueButton).toBeEnabled();
      await this.continueButton.click();
    }

     async closePopupIfPresent() {
      try{
        await this.closeButton.waitFor({
          state:'visible',
          timeout: 10000
        });
        await this.closeButton.click();
      }catch{}
    
      }
}