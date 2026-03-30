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

    const safeTone = typeof tone === "string" && tone.trim() ? tone.trim() : "Professional";
    const safeCringe =
      typeof cringe === "number" && Number.isFinite(cringe) ? Math.max(0, Math.min(100, cringe)) : 50;

    const emojiBudget =
      safeCringe <= 10 ? "0" : safeCringe <= 30 ? "0–1" : safeCringe <= 60 ? "1–3" : safeCringe <= 85 ? "3–6" : "6–10";

    const prompt = `
You are an expert LinkedIn post editor who turns raw notes into high-engagement posts without inventing facts.

Transform the INPUT into a LinkedIn post with this exact structure:

1) Hook (1–2 lines, scroll-stopping, specific)
2) Story (3–8 short paragraphs, 1–2 sentences each)
3) Lessons (optional; 3–5 bullets only if it improves clarity)
4) Ending (one strong takeaway + a question to invite comments)
5) Hashtags (3–5 on their own lines, at the very bottom)

Tone: ${safeTone}
Cringe slider: ${safeCringe}/100

Quality rules:
- Keep it concise and skimmable. Prefer short sentences and lots of line breaks.
- Do NOT add claims, numbers, employers, results, or personal details not present in the input.
- Make the hook concrete (no generic “Here’s what I learned…”).
- Use emojis sparingly and intentionally. Emoji budget: ${emojiBudget} total. If cringe <= 10, use none.
- Avoid clichés (e.g., “game-changer”, “unlock”, “let that sink in”).
- No titles, no markdown headers, no “As an AI”, no preamble. Output ONLY the post content.

INPUT:
${input}
    `.trim();

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
