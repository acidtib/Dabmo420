import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('bong')
		.setDescription('Take a bong hit'),
	async execute(interaction: any) {
		await interaction.reply(`<a:bong:1372900000000000000>`);
	},
};
