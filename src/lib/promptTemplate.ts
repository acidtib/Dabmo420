import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import type { LLMOptions, MessageContent, MessageRole, ContentBlock, TextContent, ImageContent } from "../types.ts";

export class PromptTemplate {
  private messages: ChatCompletionMessageParam[] = [];
  private config: LLMOptions;

  constructor(config: LLMOptions) {
    this.config = config;

    // Add system prompt if provided
    if (config.systemPrompt) {
      this.addSystemMessage(config.systemPrompt);
    }
  }

  // Add a system message (usually text only)
  addSystemMessage(content: MessageContent): this {
    this.messages.push({
      role: 'system',
      content: content as string,
    });
    return this;
  }

  // Add a user message
  addUserMessage(content: MessageContent): this {
    this.messages.push({
      role: 'user',
      content: content as string,
    });
    return this;
  }

  // Add an assistant message
  addAssistantMessage(content: MessageContent): this {
    this.messages.push({
      role: 'assistant',
      content: content as string,
    });
    return this;
  }

  // Add a message with specified role
  addMessage(role: MessageRole, content: MessageContent): this {
    this.messages.push({
      role,
      content: content as string,
    });
    return this;
  }

  // Helper method to add text content
  addTextMessage(role: MessageRole, text: string): this {
    return this.addMessage(role, text);
  }

  // Helper method to add multimodal message with text and image
  addTextAndImageMessage(role: MessageRole, text: string, imageUrl: string): this {
    const content: ContentBlock[] = [
      { type: 'text', text },
      { 
        type: 'image_url', 
        image_url: imageUrl 
      }
    ];
    return this.addMessage(role, content);
  }

  // Helper method to create content blocks
  static createTextContent(text: string): TextContent {
    return { type: 'text', text };
  }

  static createImageContent(imageUrl: string): ImageContent {
    return {
      type: 'image_url',
      image_url: imageUrl
    };
  }

  // Get all messages
  getMessages(): ChatCompletionMessageParam[] {
    return [...this.messages];
  }

  // Clear all messages
  clear(): this {
    this.messages = [];
    return this;
  }

  // Remove last message
  removeLastMessage(): this {
    this.messages.pop();
    return this;
  }

  // Get message count
  getMessageCount(): number {
    return this.messages.length;
  }

  // Get messages by role
  getMessagesByRole(role: MessageRole): ChatCompletionMessageParam[] {
    return this.messages.filter(msg => msg.role === role);
  }

  // Update configuration
  updateConfig(newConfig: Partial<LLMOptions>): this {
    this.config = { ...this.config, ...newConfig };
    return this;
  }

  // Get current configuration
  getConfig(): Omit<LLMOptions, 'systemPrompt'> {
    const { systemPrompt, ...rest } = this.config;
    return rest;
  }

  // Convert to JSON string
  toJSON(): string {
    return JSON.stringify({
      messages: this.messages,
      config: this.config
    }, null, 2);
  }

  // Create from JSON
  static fromJSON(json: string): PromptTemplate {
    const data = JSON.parse(json);
    const template = new PromptTemplate(data.config);
    template.messages = data.messages.map((msg: any) => ({
      ...msg,
    }));
    return template;
  }
}