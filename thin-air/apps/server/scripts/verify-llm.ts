import { generateWithFallback } from "../src/lib/ai";

async function verifyLLM() {
    console.log("🧪 Starting LLM Verification...");

    const prompt = "Hello! Are you ready to build Thin Air? Please respond with 'Yes, I am ready.' in Australian English.";

    try {
        const response = await generateWithFallback(prompt);
        console.log("\n✅ LLM Response Received:");
        console.log("---------------------------------------------------");
        console.log(response);
        console.log("---------------------------------------------------");
        console.log("🎉 Verification Successful!");
    } catch (error) {
        console.error("\n❌ Verification Failed!");
        console.error(error);
        process.exit(1);
    }
}

verifyLLM();
