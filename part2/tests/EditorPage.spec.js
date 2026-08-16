import {test,expect} from '@playwright/test';

import {LoginPage} from '../pages/LoginPage';
import {DashboardPage} from '../pages/Dashboard';
import {EditorPage} from '../pages/EditorPage';

test("User can open the video card on the dashboard and navigate to the editor page", async ({page}) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);  
    const editorPage = new EditorPage(page);

    await loginPage.open();
    await loginPage.login(process.env.TRUPEER_EMAIL, process.env.TRUPEER_PASSWORD);
    await loginPage.closePopupIfPresent();
    await expect(page).not.toHaveURL(/auth/);
    await expect(page.getByText('How would you like to get started?')).toBeVisible();
    await dashboardPage.openVideoCard();

    //Capture Original Script 
    await editorPage.verifyEditorLoaded();
    
    const originalScript = await editorPage.getScript();

    //Modify the script using AI prompt
    await editorPage.rewriteScript("Make it more engaging");
    


    //Capture Modified Script
    const modifiedScript = await editorPage.getScript();
    console.log("Original Script:", originalScript);
    console.log("Modified Script:", modifiedScript);
    await editorPage.keepChanges();


    expect(modifiedScript).not.toBe(originalScript);


    await editorPage.revertToOriginal();

    await editorPage.keepChanges();

    // await editorPage.discardChanges();

     


//     // 1. Go to Visuals tab and turn on background
//     await page.getByRole('tab', { name: 'Visuals' }).click();
//     const before = await editorPage.previewCanvas.screenshot({ path: 'test-results/before.png' });

//     await page.getByRole('switch').click();

//     // 2. Take a "photo" of the canvas BEFORE picking a color
//     await page.waitForTimeout(500); // let it settle after the switch toggle

// // ... click swatch ...

//     // 3. Click a background swatch (your existing canvas-click code)
//     await page.locator('canvas').first().click({ position: { x: 20, y: 60 } });

//     // 4. Take a "photo" of the canvas AFTER
//     await page.waitForTimeout(500); // let the 300ms CSS transition finish
//     // const after = await editorPage.previewCanvas.screenshot();
//     const after = await editorPage.previewCanvas.screenshot({ path: 'test-results/after.png' });

//     // 5. Compare the two photos — if they're identical, nothing changed
//     expect(
//         before.equals(after),
//         'Preview canvas should look different after applying a background'
//     ).toBe(false);

})