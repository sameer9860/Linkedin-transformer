import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the Google Generative AI SDK with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req: Request) {
  try {
    const { input, tone, cringe } = await req.json();

    if (!input) {
      return NextResponse.json(
        { error: "Input text is required" },
        { status: 400 }
      );
    }

    const prompt = `
      You are an expert LinkedIn content creator known for high engagement.
      Rewrite the following input text into a compelling LinkedIn post.
      
      Tone: ${tone}
      Cringe level (0-100): ${cringe} (Where 0 is extremely professional/reserved and 100 is maximum "hustle culture" / "guru" style with many emojis and forced inspiration).
      
      Guidelines:
      1. Start with a strong hook that stops the scroll.
      2. Use short, punchy sentences and paragraphs.
      3. Use bullet points if it helps structure the lessons.
      4. Include relevant emojis based on the cringe level (more cringe = more emojis).
      5. End with a question or call to action to drive comments.
      6. Include 3-5 relevant hashtags at the very bottom.
      
      Input Text: "${input}"
      
      Output ONLY the LinkedIn post content. No introductory or concluding remarks.
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: "You are a LinkedIn content transformation engine."
    });
    
    const generatedText = result.response.text();

    return NextResponse.json({ output: generatedText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate post. Please check your API key and try again." },
      { status: 500 }
    );
  }
}
