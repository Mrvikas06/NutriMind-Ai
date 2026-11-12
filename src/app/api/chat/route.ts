import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "A valid non-empty 'messages' array is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "Google Gemini API key is missing. Set GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY in your environment.",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const google = createGoogleGenerativeAI({ apiKey });
    const { messages } = body;
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google('gemini-1.5-flash'),
      messages: modelMessages,
      system:
        "You are NutriMind, an expert AI nutritionist and health coach. Provide concise, friendly, evidence-based nutrition advice, healthy recipe ideas, meal planning tips, and sustainable lifestyle recommendations. When relevant, include dietary alternatives and nutritional breakdowns. Always maintain an encouraging tone, and remind users to consult a medical professional for clinical dietary needs.",
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to process chat request.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
