import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  UIMessage,
} from "ai";

import { google } from "@ai-sdk/google";
import { proposalTools } from "@/lib/ai/tools";
import { systemPrompt } from "./systemPrompt";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } =
    await req.json();

  const result = streamText({
    model: google("gemini-3-flash-preview"),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    tools: proposalTools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}