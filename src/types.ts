import type { ChatInputCommandInteraction, SlashCommandBuilder, Collection } from "discord.js";

export interface Command {
	data: SlashCommandBuilder;
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

// Declare the commands property on Client
declare module "discord.js" {
	export interface Client {
		commands: Collection<string, Command>;
	}
}

// LLM stuff
export interface LLMOptions {
  model: string;
  temperature: number;
  maxTokens?: number;
  systemPrompt?: string;
}

// Types for different message roles
export type MessageRole = 'system' | 'user' | 'assistant';

// Content types for multimodal messages
export interface TextContent {
  type: 'text';
  text: string;
}

export interface ImageContent {
  type: 'image_url';
  image_url: string | { url: string; detail?: 'low' | 'high' | 'auto' };
}

export interface AudioContent {
  type: 'audio';
  audio_url: string;
}

export interface VideoContent {
  type: 'video';
  video_url: string;
}

// Union type for all content types
export type ContentBlock = TextContent | ImageContent | AudioContent | VideoContent;

// Content can be either a simple string or an array of content blocks
export type MessageContent = string | ContentBlock[];