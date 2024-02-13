/*
 * Copyright (c) 2024.
 * Deepanshu
 */

import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from "@google/generative-ai";

const API_KEY: string = process.env.REACT_APP_GEMINI_KEY as string;
// code picked off MakerSuite template

/**
 * Configure PaLM's settings and generate a response based off user's input parameters.
 * @param MODEL_NAME gemini-pro for text inference and generation, gemini-vision-pro for image inference. currently only supporting gemini-pro
 * @param promptText the text to be supplied as input
 */
export async function runModel(MODEL_NAME: string, promptText: string) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model: MODEL_NAME});

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 4096,
    };

    // remove safety thresholds for all categories
    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ];


    const parts: { text: string }[] = [
        {
            text: promptText
        }
    ];

    const result = await model.generateContent({
        contents: [{role: "user", parts}],
        generationConfig,
        safetySettings,
    });

    const response = result.response;
    // console.log(response);
    // console.log(response.text());
    return response;
}

//run();
