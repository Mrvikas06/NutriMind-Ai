import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-1.5-flash'),
    messages,
    system: "You are NutriMind, an expert AI nutritionist. Your goal is to help users make healthier eating choices, understand nutrition, and build sustainable habits. Provide concise, friendly, and practical advice."
  });

  return result.toTextStreamResponse();
}
