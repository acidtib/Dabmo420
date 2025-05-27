import { SlashCommandBuilder } from "discord.js";
import { llmChat } from "../../utils/llmChat.ts";

export default {
	data: new SlashCommandBuilder()
		.setName('bong')
		.setDescription('Taking a bong hit'),
	async execute(interaction: any) {
		const content = await llmChat(`/bong`);
		await interaction.reply(`<@${interaction.member.id}> ${content}`);	
	},
};
