import {test,expect} from '@playwright/test'
import 'dotenv/config'

import { LoginPage } from '../../part2/pages/LoginPage.js'
import { EditorPage } from '../../part2/pages/EditorPage.js'
import { DashboardPage } from '../../part2/pages/Dashboard.js'

import { LLMJudge } from '../services/LLMJudge.js'
import fs from 'fs';

test('AI Should Preserve the original Script intent', async ({page})=>{


    /** 
     * Initialize the page Object
     */
    const loginPage=new LoginPage(page);
    const dashBoard=new DashboardPage(page);
    const editor=new EditorPage(page);

    const judge=new LLMJudge();

    /**
     * Login
     */

    await loginPage.open();
    await loginPage.login(
        process.env.TRUPEER_EMAIL,
        process.env.TRUPEER_PASSWORD
    );

    await loginPage.closePopupIfPresent();
    await expect(page).not.toHaveURL(/auth/);

    await expect(page.getByText('How would you like to get started?')).toBeVisible();

     /**
      * Open Existing Video
      */

    await dashBoard.openVideoCard();

     /**
      * 
      * verify Editor
      */

    await editor.verifyEditorLoaded();

     /**
      * Capture the original Script
      * 
      */

    const originalScript=  await editor.getScript();

     console.log('\n========== ORIGINAL SCRIPT ==========');
     console.log(originalScript);


     /**
      * Define AI Prompt
      */

    const prompts = [
    'Make it more engaging',
    'Make this more professional',
    'Add a call to action at the end',
    'Translate to Spanish'
    ];

    const results=[];
     
     /**
      * Ask TrupeerAI to write the script
      */

    for(const prompt of prompts){

        await editor.rewriteScript(prompt);


        /**
         * Capture Actual AI generated Script
         */

        const modifiedScript= await editor.getScript();

        console.log('\n========== AI GENERATED SCRIPT ==========');
        console.log(modifiedScript);


        /**
         * Basic Deterministic assertion
         */

        expect(
            modifiedScript.trim(),
            'AI should generate different Script'
        ).not.toBe(originalScript.trim());

        /**
         * 
         * Send Original + prompt + AI Output
         *      to LLM Judge
         */

        const judgeResult=await judge.evaluate(
            originalScript,
            prompt,
            modifiedScript
        );


        /**
         * Adding in Results prompt, pass, confidence, summary
         */

        results.push({
            prompt,
            passed: judgeResult.overallPass,
            confidence: judgeResult.confidence,
            criteria: judgeResult.criteria,
            summary: judgeResult.summary
        });

        /**
         * Print LLM Judge Result
         */

        console.log('\n========== LLM JUDGE RESULT ==========');
        console.log(JSON.stringify(judgeResult, null, 2));


        /**
         * Assert Sementic Assertion
         */

        expect(judgeResult.overallPass,
            `LLM Judge failed : ${judgeResult.summary}`
        ).toBe(true);


        await editor.keepChanges();
        
        await editor.revertToOriginal();

        await editor.keepChanges();

    }

    const passedCount = results.filter(
    result => result.passed === true
    ).length;

    const overallConfidence =
        results.reduce(
            (sum, result) => sum + result.confidence,
            0
        ) / results.length;

    const evaluationReport = {
        testName: 'AI Script Modification Evaluation',

        executedAt: new Date().toISOString(),

        overallResult:
            passedCount === results.length
                ? 'PASS'
                : 'FAIL',

        totalPrompts: results.length,

        promptsPassed: passedCount,

        promptsFailed:
            results.length - passedCount,

        overallConfidence:
            Number((overallConfidence * 100).toFixed(2)),

        results: results
    };

    fs.writeFileSync(
        'test-results/ai-script-evaluation.json',
        JSON.stringify(evaluationReport, null, 2)
    );

    console.log('\nJSON report generated:');
    console.log('test-results/ai-script-evaluation.json');
    
    /**
     * Attaching JSON to PLAYWRIGHT Report
     */

    await test.info().attach('AI Evaluation JSON', {
    path: 'test-results/ai-script-evaluation.json',
    contentType: 'application/json'
    });

    /**
     * Summary to readable form
     */
    await test.info().attach('AI Evaluation Summary', {
    body: JSON.stringify(evaluationReport, null, 2),
    contentType: 'application/json'
    });

        //     const summary = `
        // AI SCRIPT EVALUATION SUMMARY

        // ${results.map((result, index) => `
        // ${index + 1}. Prompt: ${result.prompt}
        // Result: ${result.passed ? 'PASS' : 'FAIL'}
        // Confidence: ${(result.confidence * 100).toFixed(1)}%

        // Intent: ${result.criteria.intent ? 'PASS' : 'FAIL'}
        // Coherence: ${result.criteria.coherence ? 'PASS' : 'FAIL'}
        // Preservation: ${result.criteria.preservation ? 'PASS' : 'FAIL'}
        // Meaningful Change: ${result.criteria.meaningfulChange ? 'PASS' : 'FAIL'}

        // Summary: ${result.summary}
        // `).join('\n')}

        // ----------------------------------------------------
        // Prompts Passed: ${results.filter(r => r.passed).length}/${results.length}

        // Overall Confidence:
        // ${(
        //     results.reduce((sum, r) => sum + r.confidence, 0) / results.length * 100
        // ).toFixed(1)}%

        // Overall Result:
        // ${results.every(r => r.passed) ? 'PASS' : 'FAIL'}
        // `;

        // console.log(summary);

        // await test.info().attach('AI Script Evaluation Summary', {
        //     body: summary,
        //     contentType: 'text/plain'
        // });

    

})