import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import path from "path";

// Load env from root
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("❌ No API Key found");
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Access the model manager (if available via SDK, otherwise we try a simple fetch)
    // The SDK doesn't expose listModels directly on the main class in all versions, 
    // but we can try to just use a known model like 'gemini-pro' (1.0) as a fallback test.

    // Actually, let's try to just hit the REST API directly to list models to be sure.
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("❌ API Error:", data.error);
        } else {
            console.log("✅ Available Models:");
            if (data.models) {
                data.models.forEach((m: any) => {
                    console.log(`- ${m.name} (${m.displayName})`);
                });
            } else {
                console.log("No models found in response.");
            }
        }
    } catch (error) {
        console.error("❌ Fetch failed:", error);
    }
}

listModels();
