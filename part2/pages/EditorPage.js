import {expect} from '@playwright/test';

export class EditorPage {

    constructor(page) {
        this.page = page;

         this.scriptText = page.getByRole('tab', {
             name: 'Script',
             exact:true
            });
         this.musicText = page.getByRole('tab', { 
            name: 'Music' ,
            exact:true
        });
        
         this.visualText =page.getByRole('tab', { 
            name: 'Visuals' ,
            exact:true
        });
        
        this.scriptPannel=page.locator(
            'div.editVideoBar_scripts__6tVgN'
        );

        //Individual chunks of the script (dividen into multiple divs)
        this.scriptChunks=page.locator(
            '[role="textbox"][contenteditable="true"]'
        );

        //AI script modification prompt
        this.aiPrompt = page.getByRole(
            'textbox', { name: 'e.g. Make it more'}
        );

        this.aiModifyButton= page.locator('button:has(path[d*="17.084"])');

        this.rewriteButton = page.getByRole('button', {
                name: 'Rewrite script',
                exact: true
            });

        this.saveScriptButton = page.getByRole(
            'button', { name: 'Keep changes' 
            ,exact:true
        });

        this.reverstToOriginal=page.getByRole('button', { 
            name: 'Revert script version' 
        });

        this.useOriginalScript=page.getByRole('menuitem', { 
            name: 'Use original transcript' });

        this.discardButton = page.getByRole(
            'button', { name: 'Discard changes' ,
            exact:true
        });

        this.previewCanvas = page.locator('canvas[data-engine^="three.js"]');

        this.rewriteWithAitextVerification = page.getByText('Rewrite with AI', {
            exact: true
        });


    }
        

        async verifyEditorLoaded(){
            await this.scriptText.waitFor({
                state:'visible',
                timeout:20000
            });

            await expect(this.scriptText).toBeVisible();
            await expect(this.musicText).toBeVisible();
            await expect(this.visualText).toBeVisible();

        }


        async getScript() {
            const chunks = await this.scriptChunks.allTextContents();

            return chunks
                .map(text => text.trim())
                .filter(Boolean)
                .join('\n');

        }


        async rewriteScript(prompt) {
            await this.aiModifyButton.click();
            await this.rewriteWithAitextVerification.waitFor({ state: 'visible' });
            await this.aiPrompt.fill(prompt);
            await this.rewriteButton.click();
            await this.saveScriptButton.waitFor({
                state: 'visible',
                timeout: 20000
            });

        }

        async keepChanges(){
            await this.saveScriptButton.waitFor({ state: 'visible' });
            await this.saveScriptButton.click();
        }

        async revertToOriginal(){
            await this.reverstToOriginal.click();
            await this.useOriginalScript.click();
            
        }

        async discardChanges(){
            await this.discardButton.click();
        }
}



