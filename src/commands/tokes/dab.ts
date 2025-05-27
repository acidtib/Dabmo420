import { SlashCommandBuilder } from "discord.js";
import { llmChat } from "../../utils/llmChat.ts";

export default {
	data: new SlashCommandBuilder()
		.setName('dab')
		.setDescription('Taking a dab'),
	async execute(interaction: any) {
		const content = await llmChat(`/dab`);
		await interaction.reply(`<@${interaction.member.id}> ${content}`);
	},
};
