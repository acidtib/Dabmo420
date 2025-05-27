import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import OpenAI from "openai";
import type { LLMOptions } from "../types.ts";

class LLM {
  private client: OpenAI;
  private options: LLMOptions;

  private static DEFAULT_OPTIONS: LLMOptions = {
    model: "gpt-4.1-mini",
    temperature: 1,
    maxTokens: undefined,
  };

  constructor(options: Partial<LLMOptions> = {}) {
    this.options = { ...LLM.DEFAULT_OPTIONS, ...options };

    this.client = new OpenAI({
      baseURL: Deno.env.get("LLM_BASE_URL") || "https://api.openai.com/v1",
      apiKey: Deno.env.get("LLM_API_KEY") || "",
    });
  }

  async chatCompletion(messages: ChatCompletionMessageParam[]) {
    const response = await this.client.chat.completions.create({
      model: this.options.model,
      messages,
      temperature: this.options.temperature,
    });

    return response;
  }
}

export default LLM;