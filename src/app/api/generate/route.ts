import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize the Google Generative AI SDK with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

type GenerateAction = "generate" | "shorter" | "emotional" | "regenerate" | "hooks";

const getEmojiBudget = (cringe: number): string => {
  if (cringe <= 10) return "0";
  if (cringe <= 30) return "0-1";
  if (cringe <= 60) return "1-3";
  if (cringe <= 85) return "3-6";
  return "6-10";
};

const buildBasePrompt = (input: string, tone: string, cringe: number): string => {
  const emojiBudget = getEmojiBudget(cringe);
  return `
You are an expert LinkedIn post editor who turns raw notes into high-engagement posts without inventing facts.

Transform the INPUT into a LinkedIn post with this exact structure:

1) Hook (1-2 lines, scroll-stopping, specific)
2) Story (3-8 short paragraphs, 1-2 sentences each)
3) Lessons (optional; 3-5 bullets only if it improves clarity)
4) Ending (one strong takeaway + a question to invite comments)
5) Hashtags (3-5 on their own lines, at the very bottom)

Tone: ${tone}
Cringe slider: ${cringe}/100

Quality rules:
- Keep it concise and skimmable. Prefer short sentences and lots of line breaks.
- Do NOT add claims, numbers, employers, results, or personal details not present in the input.
- Make the hook concrete (no generic "Here's what I learned...").
- Use emojis sparingly and intentionally. Emoji budget: ${emojiBudget} total. If cringe <= 10, use none.
- Avoid cliches (e.g., "game-changer", "unlock", "let that sink in").
- No titles, no markdown headers, no "As an AI", no preamble. Output ONLY the post content.

INPUT:
${input}
  `.trim();
};

const buildPrompt = ({
  action,
  input,
  tone,
  cringe,
  currentOutput,
}: {
  action: GenerateAction;
  input: string;
  tone: string;
  cringe: number;
  currentOutput?: string;
}): string => {
  const basePrompt = buildBasePrompt(input, tone, cringe);

  if (action === "shorter") {
    return `
${basePrompt}

Now rewrite the post to be significantly shorter while preserving core meaning.
Rules:
- Target 45-65% of the original length.
- Keep the same structure and readability.
- Keep hashtags at the bottom.
    `.trim();
  }

  if (action === "emotional") {
    return `
${basePrompt}

Now increase emotional resonance without becoming cheesy.
Rules:
- Add more vulnerability, stakes, or personal reflection.
- Keep credibility and avoid exaggeration.
- Preserve factual accuracy from the input.
    `.trim();
  }

  if (action === "regenerate") {
    return `
${basePrompt}

Create a fresh variation of the post.
Rules:
- Change the hook angle and wording.
- Keep the same facts and message.
- Do not repeat the exact phrasing of this previous output:
${currentOutput || "(none)"}
    `.trim();
  }

  if (action === "hooks") {
    return `
You write high-performing LinkedIn hooks.

Input context:
${input}

Tone: ${tone}
Cringe slider: ${cringe}/100

Generate exactly 3 distinct hook options.
Rules:
- Each hook must be 1-2 lines and concrete.
- Avoid cliches and generic motivational language.
- Do not invent facts not in the input.
- Return plain text with this exact format:
1. <hook>
2. <hook>
3. <hook>
    `.trim();
  }

  return basePrompt;
};

export async function POST(req: Request) {
  try {
    const { input, tone, cringe, action, currentOutput } = await req.json();

    if (!input) {
      return NextResponse.json(
        { error: "Input text is required" },
        { status: 400 }
      );
    }

    const safeTone = typeof tone === "string" && tone.trim() ? tone.trim() : "Professional";
    const safeCringe =
      typeof cringe === "number" && Number.isFinite(cringe) ? Math.max(0, Math.min(100, cringe)) : 50;
    const safeAction: GenerateAction =
      action === "shorter" ||
      action === "emotional" ||
      action === "regenerate" ||
      action === "hooks"
        ? action
        : "generate";

    const prompt = buildPrompt({
      action: safeAction,
      input,
      tone: safeTone,
      cringe: safeCringe,
      currentOutput: typeof currentOutput === "string" ? currentOutput : "",
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: "You are a LinkedIn content transformation engine."
    });
    
    const generatedText = result.response.text();

    if (safeAction === "hooks") {
      const hooks = generatedText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => /^\d+\.\s+/.test(line))
        .map((line) => line.replace(/^\d+\.\s+/, "").trim())
        .filter(Boolean)
        .slice(0, 3);

      return NextResponse.json({ hooks, output: generatedText });
    }

    return NextResponse.json({ output: generatedText, action: safeAction });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate post. Please check your API key and try again." },
      { status: 500 }
    );
  }
}
