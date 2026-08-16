import Groq from "groq-sdk";


export class LLMJudge {

    constructor(){
        this.client = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });
    }

    async evaluate(originalScript,prompt,aiOutput){
        const rubricPrompt = `
        You are a QA evaluator

        Original Script:
        ${originalScript}

        User Prompt:
        ${prompt}
        
        AI Output:
        ${aiOutput}

        Evaluate:
        1. Intent Match
        2. Coherence & Grammar
        3. Core Information Preserved
        4. Meaningful Transformation

            Evaluate whether the AI output makes the type of transformation
            requested by the user.

            Examples:
            - "Make it more engaging" → style should meaningfully improve.
            - "Make it more professional" → tone should meaningfully change.
            - "Add a call to action" → a CTA should actually be added.
            - "Translate to Spanish" → the output should actually be translated
            into Spanish.

            Do NOT penalize translation merely because the underlying meaning
            remains the same. Preserving meaning is expected for translation.

        Return ONLY valid JSON:
        {
            "overallPass" : true,
            "confidence" : 0.95,
            "originalScript":"...",
            "modifiedScript":"...",
            "criteria" : {
                "intent" :true,
                "coherence" : true,
                "preservation" : true,
                "meaningfulChange" : true
            },
            "summary" : "short explanation"
        }
        `;

        const response = await this.client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role : "user",
                    content: rubricPrompt
                }
            ],
            temperature: 0
        });

        const content= response.choices[0].message.content;
        // const cleanedContent=content
        //     .replace(/^```(?:json)\s*/i,"")
        //     .replace(/\s*```$/i,"")
        //     .trim();

        // return JSON.parse(
        //     cleanedContent
        // );

        let cleanedContent = content.trim();

        if (cleanedContent.startsWith("```")) {
            cleanedContent = cleanedContent.replace(/^```[a-zA-Z]*\s*/, "");
        }

        if (cleanedContent.endsWith("```")) {
            cleanedContent = cleanedContent.slice(0, -3).trim();
        }

        return JSON.parse(cleanedContent);

    }


}

