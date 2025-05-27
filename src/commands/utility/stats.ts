import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import Sessions from '../../models/sessions.ts';

interface Session {
	kind: string;
	content: string;
	createdAt: Date;
}

export default {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('View your session stats'),
	async execute(interaction: any) {
		// Get all sessions for the user
		const sessions = await Sessions.findAll({
			where: {
				discordUserId: interaction.user.id,
			},
		});

		// Get counts by type
		const sessionsByType = sessions.reduce((acc: any, session: any) => {
			acc[session.kind] = (acc[session.kind] || 0) + 1;
			return acc;
		}, {});

		// Create an embed for better formatting
		const embed = new EmbedBuilder()
			.setColor(0x00FF00)
			.setTitle('Your Session Stats 📊')
			.setDescription(`Here's your session history, <@${interaction.member.id}>!`)
			.addFields(
				{ name: 'Total Sessions 🔥', value: sessions.length.toString(), inline: false },
				{ name: 'Dabs 💨', value: (sessionsByType['dab'] || 0).toString(), inline: true },
				{ name: 'Blunts 🌿', value: (sessionsByType['blunt'] || 0).toString(), inline: true },
				{ name: 'Bongs 🌊', value: (sessionsByType['bong'] || 0).toString(), inline: true },
				{ name: 'Joints 🚬', value: (sessionsByType['joint'] || 0).toString(), inline: true },
			);

		await interaction.reply({ embeds: [embed] });
	},
};
