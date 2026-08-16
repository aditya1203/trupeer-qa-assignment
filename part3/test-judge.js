import 'dotenv/config'

import { LLMJudge } from './services/LLMJudge.js'

const judge= new LLMJudge();

async function run() {
    
    const originalScript=`
        Today I am going to demonstrate the basic workflow
        of the Trupeer.ai application. First, I will log into
        the application and navigate to the dashboard.`
    ;

    const prompt = `
        Rewrite the script to make it more concise while
        preserving the original meaning.
        `;

    const aiOutput = `
        Today I'll demonstrate the basic Trupeer.ai workflow.
        I'll log in and navigate to the dashboard.
        `;

    const result= await judge.evaluate (
        originalScript,
        prompt,
        aiOutput
    );

    console.log(JSON.stringify(result,null,2));
    

}

run();
