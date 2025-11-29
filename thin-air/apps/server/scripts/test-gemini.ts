import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("❌ No GEMINI_API_KEY found in .env");
    process.exit(1);
  }

  console.log("✅ API Key loaded:", apiKey.substring(0, 10) + "...");
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    console.log("🤖 Testing Gemini 1.5 Flash...");
    const result = await model.generateContent("Say hello in Australian English");
    const response = result.response;
    const text = response.text();
    
    console.log("✅ Gemini Response:", text);
    console.log("\n🎉 Gemini API is working!");
  } catch (error) {
    console.error("❌ Gemini test failed:", error);
    process.exit(1);
  }
}

testGemini();
