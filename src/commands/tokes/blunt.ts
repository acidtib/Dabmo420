import { SlashCommandBuilder } from "discord.js";
import { llmChat } from "../../utils/llmChat.ts";

export default {
	data: new SlashCommandBuilder()
		.setName('blunt')
		.setDescription('Smoking a blunt'),
	async execute(interaction: any) {
		const content = await llmChat(`/blunt`);
		await interaction.reply(`<@${interaction.member.id}> ${content}`);
	},
};
