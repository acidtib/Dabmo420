import { Events } from 'discord.js';
import Guild from '../models/guilds.ts';

export default {
	name: Events.GuildDelete,
	async execute(guild: any) {
		console.log(`Left a guild: ${guild.name}`);

        // Get the guild from the database
        const guildData = await Guild.findOne({
            where: {
                discordId: guild.id,
            },
        });

        // if we have a guild lets deactive it
        if (guildData) {
            await guildData.update({
                active: false,
            });
        }
	},
};