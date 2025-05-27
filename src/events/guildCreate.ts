import { Events } from 'discord.js';
import Guild from '../models/guilds.ts';
import User from '../models/users.ts';

async function upsertUser(owner: any): Promise<void> {
  const userData = {
    discordId: owner.user.id,
    username: owner.user.username,
    avatar: owner.user.displayAvatarURL({ size: 2048 }),
    banner: owner.user.bannerURL({ size: 2048 }),
  };

  const [user, created] = await User.findOrCreate({
    where: { discordId: userData.discordId },
    defaults: userData,
  });

  if (!created) {
    await user.update(userData);
  }
}

async function upsertGuild(guild: any): Promise<void> {
  const guildData = {
    discordId: guild.id,
    name: guild.name,
    icon: guild.iconURL({ size: 2048 }),
    ownerId: guild.ownerId,
    active: true,
    memberCount: guild.memberCount,
  };

  const [existingGuild, created] = await Guild.findOrCreate({
    where: { discordId: guildData.discordId },
    defaults: guildData,
  });

  if (!created) {
    await existingGuild.update(guildData);
  }
}

export default {
	name: Events.GuildCreate,
	async execute(guild: any) {
		try {
      console.log(`Joined a new guild: ${guild.name} - ${guild.id}`);
      
      const owner = await guild.fetchOwner();
      
      // First create/update the user
      await upsertUser(owner);
      
      // Then create/update the guild
      await upsertGuild(guild);
      
      console.log(`Successfully processed guild: ${guild.name}`);
    } catch (error) {
      console.error(`Error processing guild ${guild.name}:`, error);
    }
	},
};