import { SlashCommandBuilder } from "discord.js";
import { llmChat } from "../../utils/llmChat.ts";

export default {
	data: new SlashCommandBuilder()
		.setName('joint')
		.setDescription('Smoking a joint'),
	async execute(interaction: any) {
		const content = await llmChat(`/joint`);
		await interaction.reply(`<@${interaction.member.id}> ${content}`);
	},
};
