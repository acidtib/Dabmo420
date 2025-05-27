import { SlashCommandBuilder } from "discord.js";
import { llmChat } from "../../utils/llmChat.ts";
import Sessions from "../../models/sessions.ts";

export default {
	data: new SlashCommandBuilder()
		.setName('blunt')
		.setDescription('Smoking a blunt')
		.addStringOption(option =>
			option.setName('members')
				.setDescription('The members to smoke with')
				.setRequired(false)
		),
	async execute(interaction: any) {
		let content;
		if (interaction.options.get('members')) {
			const members = interaction.options.getString('members')
			content = await llmChat(`/blunt with ${members}`)
		} else {
			content = await llmChat(`/blunt`);
		}

		// save the session
		await Sessions.create({
			discordGuildId: interaction.guild.id,
			discordUserId: interaction.user.id,
			kind: 'blunt',
			content,
		});

		await interaction.reply(`<@${interaction.member.id}> ${content}`);
	},
};
