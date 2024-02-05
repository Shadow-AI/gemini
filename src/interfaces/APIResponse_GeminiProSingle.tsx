/*
 * Copyright (c) 2024.
 * Deepanshu
 */

interface APIResponse {
    candidates: [{
        content: {
            parts: [
                {
                    text: string
                }
            ],
            role: string
        },
        finishReason: string,
        index: number,
        safetyRatings: [{
            category: string,
            probability: number | string
        }]
    }],
    promptFeedback: {
        safetyRatings: [{
            category: string,
            probability: number | string

        }]
    }
}

export default APIResponse;