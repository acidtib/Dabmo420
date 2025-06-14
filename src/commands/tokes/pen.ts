import { SlashCommandBuilder } from "discord.js";
import { llmChat } from "../../utils/llmChat.ts";
import Sessions from "../../models/sessions.ts";
import User from "../../models/users.ts";

async function upsertUser(user: any): Promise<void> {
	const userData = {
		discordId: user.id,
		username: user.username,
		avatar: user.displayAvatarURL({ size: 2048 }),
		banner: user.bannerURL({ size: 2048 }),
	};

	const [userRecord, created] = await User.findOrCreate({
		where: { discordId: userData.discordId },
		defaults: userData,
	});

	if (!created) {
		await userRecord.update(userData);
	}
}

export default {
	data: new SlashCommandBuilder()
		.setName('pen')
		.setDescription('Taking a pen hit')
		.addStringOption(option =>
			option.setName('members')
				.setDescription('The members to hit the pen with')
				.setRequired(false)
		),
	async execute(interaction: any) {
		let input;
		if (interaction.options.get('members')) {
			const members = interaction.options.getString('members')
			input = `/pen with ${members}`
		} else {
			input = "/pen"
		}

		// Ensure user exists in database
		await upsertUser(interaction.user);

		const content = await llmChat(input);

		// save the session
		await Sessions.create({
			discordGuildId: interaction.guild.id,
			discordUserId: interaction.user.id,
			kind: 'pen',
			input,
			content,
		});

		await interaction.reply(`<@${interaction.member.id}> ${content}`);
	},
}; 