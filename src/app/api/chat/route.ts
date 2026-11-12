import { google } from '@ai-sdk/google';
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

    const { messages } = body;
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google('gemini-1.5-flash'),
      messages: modelMessages,
      system: "You are NutriMind, an expert AI nutritionist. Your goal is to help users make healthier eating choices, understand nutrition, and build sustainable habits. Provide concise, friendly, and practical advice."
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
