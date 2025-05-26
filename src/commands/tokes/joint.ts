import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('dab')
		.setDescription('Take a dab'),
	async execute(interaction: any) {
		await interaction.reply(`<a:dab:1372900000000000000>`);
	},
};
