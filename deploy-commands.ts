// deno run --allow-read --allow-env --allow-net deploy-commands.ts

import { REST, Routes } from "discord.js";
import { join } from "@std/path";
import { walk } from "@std/fs";

// Load environment variables
const clientId = Deno.env.get("DISCORD_ID");
const guildId = Deno.env.get("DISCORD_GUILD_ID");
const token = Deno.env.get("DISCORD_TOKEN");

if (!clientId || !guildId || !token) {
	throw new Error("Missing required environment variables: DISCORD_ID, DISCORD_GUILD_ID, or DISCORD_TOKEN");
}

const commands: any[] = [];

const commandsDir = join(Deno.cwd(), "src", "commands");

// Load commands dynamically using walk
for await (const entry of walk(commandsDir, { exts: [".ts"], includeDirs: false })) {
	const commandModule = await import(`file://${entry.path}`);
    const command = commandModule.default;

	if (command && "data" in command && "execute" in command) {
		commands.push(command.data.toJSON());
	} else {
		console.warn(`[WARNING] The command at ${entry.path} is missing a required "data" or "execute" property.`);
	}
}

console.log(`Deploying commands:\n${commands.map(command => command.name).join("\n")}`);

const rest = new REST({ version: "10" }).setToken(token);

try {
	// First, delete all existing commands
	console.log('Started deleting existing application commands...');
	
	await rest.put(Routes.applicationCommands(clientId), { body: [] });
	
	console.log('Successfully deleted all existing commands.');

	// Now deploy the new commands
	console.log(`Started deploying ${commands.length} application (/) commands.`);

	const data = await rest.put(
		// Routes.applicationGuildCommands(clientId, guildId),
        Routes.applicationCommands(clientId),
		{ body: commands }
	);

	console.log(`Successfully deployed ${(data as any[]).length} application (/) commands.`);
} catch (error) {
	console.error("Failed to deploy commands:", error);
}
