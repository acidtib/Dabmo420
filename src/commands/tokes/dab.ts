import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('joint')
		.setDescription('Smoke a joint'),
	async execute(interaction: any) {
		await interaction.reply(`<a:joint:1372900000000000000>`);
	},
};
