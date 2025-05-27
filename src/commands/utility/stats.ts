import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Your stats'),
	async execute(interaction: any) {
		await interaction.reply('Your stats will be here!');
	},
};
