import OpenAI from "openai";
import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import type { RequestHandler } from "./$types";

const groq = new OpenAI({
    apiKey: env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
    timeout: 30_000,
    maxRetries: 2,
});

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();

        if (
            typeof body.essay !== "string" ||
            !body.essay.trim() ||
            body.essay.length > 10_000
        ) {
            return json({ error: "Invalid essay." }, { status: 400 });
        }

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "system",
                    content: "You are a grader, grade the user's essay.",
                },
                {
                    role: "user",
                    content: `This is my essay:\n\n${body.essay}`,
                },
            ],
            temperature: 1,
            max_completion_tokens: 2048,
            top_p: 1,
            reasoning_effort: "medium",
        });

        return json({
            response: completion.choices[0]?.message?.content ?? "",
        });
    } catch (error) {
        console.error("Groq error:", error);

        return json({ error: "Failed to grade essay." }, { status: 500 });
    }
};
