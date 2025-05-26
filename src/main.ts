import { Client, Collection, GatewayIntentBits } from "discord.js";
import { join } from "@std/path";
import { walk } from "@std/fs";
import { Command } from "./types.ts";

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection<string, Command>();

// Load commands dynamically
const commandsDir = join(Deno.cwd(), "src", "commands");

for await (const entry of walk(commandsDir, { exts: [".ts"], includeDirs: false })) {
	const command = await import(`file://${entry.path}`);
	const commandModule = command.default || command;
	
	if ("data" in commandModule && "execute" in commandModule) {
		client.commands.set(commandModule.data.name, commandModule);
	} else {
		console.warn(`[WARNING] The command at ${entry.path} is missing a required "data" or "execute" property.`);
	}
}

// Load events dynamically
const eventsDir = join(Deno.cwd(), "src", "events");

for await (const entry of walk(eventsDir, { exts: [".ts"], includeDirs: false })) {
	const event = await import(`file://${entry.path}`);
	const eventModule = event.default || event;
	
	if (eventModule.once) {
		client.once(eventModule.name, (...args) => eventModule.execute(...args));
	} else {
		client.on(eventModule.name, (...args) => eventModule.execute(...args));
	}
}

// Get the token from environment variables
const token = Deno.env.get("DISCORD_TOKEN");
if (!token) {
	throw new Error("Discord token not found in environment variables!");
}

// Log in to Discord
client.login(token);