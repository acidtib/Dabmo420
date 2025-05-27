import { SlashCommandBuilder } from "discord.js";
import { llmChat } from "../../utils/llmChat.ts";
import Sessions from "../../models/sessions.ts";

export default {
	data: new SlashCommandBuilder()
		.setName('bong')
		.setDescription('Taking a bong hit')
		.addStringOption(option =>
			option.setName('members')
				.setDescription('The members to smoke with')
				.setRequired(false)
		),
	async execute(interaction: any) {
		let input;
		if (interaction.options.get('members')) {
			const members = interaction.options.getString('members')
			input = `/bong with ${members}`
		} else {
			input = "/bong"
		}

		const content = await llmChat(input);

		// save the session
		await Sessions.create({
			discordGuildId: interaction.guild.id,
			discordUserId: interaction.user.id,
			kind: 'bong',
			input,
			content,
		});

		await interaction.reply(`<@${interaction.member.id}> ${content}`);	
	},
};
