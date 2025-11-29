import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../../../.env" });

// Configuration
const AI_PROVIDER = process.env.AI_PROVIDER || "gemini"; // 'gemini', 'anthropic', 'openrouter'
const AI_MODEL = process.env.AI_MODEL || "gemini-1.5-flash"; // Default model

// Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey || "");
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Anthropic Client
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
export const anthropic = new Anthropic({
    apiKey: anthropicApiKey || "dummy",
});

// OpenRouter Client
const openRouterApiKey = process.env.OPENROUTER_API_KEY;
export const openRouter = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: openRouterApiKey || "dummy",
});

// Mock AI Service
export async function mockGenerate(prompt: string): Promise<string> {
    console.log("🤖 [MOCK AI] Generating response for:", prompt.substring(0, 50) + "...");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return `[MOCK AI RESPONSE] Received: "${prompt.substring(0, 20)}...". Analysis: Intent=Create App, Complexity=Medium.`;
}

export async function generateWithFallback(prompt: string): Promise<string> {
    // 1. Try OpenRouter if selected or if it's the only one available
    if (AI_PROVIDER === 'openrouter' || (openRouterApiKey && !geminiApiKey && !anthropicApiKey)) {
        try {
            console.log(`🤖 Attempting OpenRouter (${AI_MODEL || 'default'})...`);
            const completion = await openRouter.chat.completions.create({
                model: AI_MODEL || "meta-llama/llama-3-8b-instruct:free",
                messages: [{ role: "user", content: prompt }],
            });
            return completion.choices[0]?.message?.content || "";
        } catch (error) {
            console.error("❌ OpenRouter failed:", error);
            // Fall through to other providers
        }
    }

    // 2. Try Gemini (Default)
    if (geminiApiKey) {
        try {
            console.log("🤖 Attempting Gemini...");
            const result = await geminiModel.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error("❌ Gemini failed:", error);
        }
    }

    // 3. Try Anthropic
    if (anthropicApiKey) {
        try {
            console.log("🔄 Falling back to Anthropic...");
            const message = await anthropic.messages.create({
                max_tokens: 1024,
                messages: [{ role: 'user', content: prompt }],
                model: 'claude-3-opus-20240229',
            });
            return message.content[0].text;
        } catch (error) {
            console.error("❌ Anthropic failed:", error);
        }
    }

    // 4. Fallback to Mock
    console.log("⚠️ All AI providers failed. Using Mock AI.");
    return mockGenerate(prompt);
}
