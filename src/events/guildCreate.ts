import { Events } from 'discord.js';
import Guild from '../models/guilds.ts';

export default {
	name: Events.GuildCreate,
	async execute(guild: any) {
		console.log(`Joined a new guild: ${guild.name} - ${guild.id}`);

        // check if the guild is already in the database
        const existingGuild = await Guild.findOne({
            where: {
                discordId: guild.id,
            },
        });
        
        // if the guild is not in the database, add it
        if (!existingGuild) {
            await Guild.create({
                discordId: guild.id,
                name: guild.name,
                icon: guild.icon,
                ownerId: guild.ownerId,
                active: true,
            });
        }

        // if the guild is in the database, update it
        if (existingGuild) {
            await existingGuild.update({
                name: guild.name,
                icon: guild.icon,
                ownerId: guild.ownerId,
                active: true,
            });
        }
	},
};