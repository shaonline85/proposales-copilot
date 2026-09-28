import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  UIMessage,
} from "ai";

import { proposalTools } from "@/lib/ai/agents";
import { defaultChatModel } from "@/lib/ai/model";
import { systemPrompt } from "@/lib/ai/prompts";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } =
    await req.json();

  const result = streamText({
    model: defaultChatModel,
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    tools: proposalTools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}