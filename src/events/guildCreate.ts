import { Events } from 'discord.js';
import Guild from '../models/guilds.ts';
import User from '../models/users.ts';

export default {
	name: Events.GuildCreate,
	async execute(guild: any) {
		console.log(`Joined a new guild: ${guild.name} - ${guild.id}`);

    // grab owner data
    const owner = await guild.fetchOwner();

    // check if the owner is in the database
    const user = await User.findOne({
      where: {
        discordId: owner.user.id,
      },
    });

    // if the user is not in the database, add them
    if (!user) {
      await User.create({
        discordId: owner.user.id,
        username: owner.user.username,
        avatar: owner.user.displayAvatarURL({ size: 2048 }),
        banner: owner.user.bannerURL({ size: 2048 }),
      });
    } else {
      // update the user
      await user.update({
        username: owner.user.username,
        avatar: owner.user.displayAvatarURL({ size: 2048 }),
        banner: owner.user.bannerURL({ size: 2048 }),
      });
    }

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
        icon: guild.iconURL({ size: 2048 }),
        ownerId: guild.ownerId,
        active: true,
        memberCount: guild.memberCount,
      });
    } else {
      // update the guild
      await existingGuild.update({
        name: guild.name,
        icon: guild.iconURL({ size: 2048 }),
        ownerId: guild.ownerId,
        active: true,
        memberCount: guild.memberCount,
      });
    }
  
	},
};