import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Model configuration
const MODEL_NAME = 'gemini-2.0-flash-thinking-exp-1219';
const SYSTEM_INSTRUCTION = 'You are an expert Software Architect. Analyze the input and return a valid JSON object with this schema: { project_name, tech_stack, entities, features }.';

/**
 * Generates a structured intent JSON from user input using Google's Gemini AI
 * @param input User's project description or requirements
 * @returns Structured JSON with project details
 */
export async function generateIntentJson(input: string) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: input }],
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 2048,
      },
      systemInstruction: {
        role: 'system',
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
    });

    const response = result.response;
    const text = response.text();
    
    // Parse the response as JSON
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Try to extract JSON if it's wrapped in markdown code blocks
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        return JSON.parse(jsonMatch[1]);
      }
      throw new Error('Invalid JSON response from AI');
    }
  } catch (error) {
    console.error('Error generating intent JSON:', error);
    throw error;
  }
}
