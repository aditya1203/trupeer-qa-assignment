import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/Dashboard';
import { EditorPage } from '../pages/EditorPage';

test('AI should not modify script for a meaningless prompt', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const editorPage = new EditorPage(page);

    // Login
    await loginPage.open();

    await loginPage.login(
        process.env.TRUPEER_EMAIL,
        process.env.TRUPEER_PASSWORD
    );

    await loginPage.closePopupIfPresent();

    await expect(page).not.toHaveURL(/auth/);

    // Navigate to video
    await expect(
        page.getByText('How would you like to get started?')
    ).toBeVisible();

    await dashboardPage.openVideoCard();

    // Verify editor
    await editorPage.verifyEditorLoaded();

    // Capture original script
    const originalScript = await editorPage.getScript();

    console.log('\n========== ORIGINAL SCRIPT ==========');
    console.log(originalScript);

    // Meaningless prompt
    const invalidPrompt = 'ABCD QWERTY 12345 XYZ';

    console.log('\n========== INVALID PROMPT ==========');
    console.log(invalidPrompt);

    // Send meaningless prompt
    await editorPage.rewriteScript(invalidPrompt);

    // Capture result
    const modifiedScript = await editorPage.getScript();

    console.log('\n========== SCRIPT AFTER INVALID PROMPT ==========');
    console.log(modifiedScript);

    // Negative assertion
    expect(
        modifiedScript.trim(),
        'Meaningless AI prompt should not modify the original script'
    ).not.toBe(originalScript.trim());
});