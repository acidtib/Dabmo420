import { PromptTemplate } from "../lib/promptTemplate.ts";
import { promptsSystem } from "../lib/prompts.ts";
import LLM from "../lib/llm.ts";

export async function llmChat(command: string) {
	const prompt = new PromptTemplate({
    model: Deno.env.get("LLM_MODEL") || "gpt-4o-mini",
    temperature: 1.8,
  });

  prompt.addSystemMessage(await promptsSystem());
  prompt.addUserMessage(command);

	const llm = new LLM(prompt.getConfig());

	const response = await llm.chatCompletion(prompt.getMessages());

	const content = response.choices[0].message.content?.replace(/^"|"$/g, '');

	return content;
}