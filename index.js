const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, prefix } = require('./config.json'); // Assuming your prefix is in config.json
const { burger } = require('./commands/fun/burger');
const { channel } = require('node:diagnostics_channel');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] }); // Add GatewayIntentBits.MessageContent to handle message content

client.commands = new Collection();
const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));

for (const folder of commandFolders) {
	const folderPath = path.join(__dirname, 'commands', folder);
	const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(path.join(folderPath, file));
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${path.join(folderPath, file)} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', (message) => {
	if (message.author.bot) {
		return;
	}
	if (message.content === 's!burger') {
		callBurger(message);
	}
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);
