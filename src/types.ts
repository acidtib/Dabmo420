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