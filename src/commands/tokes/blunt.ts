import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('blunt')
		.setDescription('Smoke a blunt'),
	async execute(interaction: any) {
		await interaction.reply(`<a:blunt:1372900000000000000>`);
	},
};
