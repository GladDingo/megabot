const { SlashCommandBuilder, EmbedBuilder, Client, Intents } = require('discord.js');
const commandUsage = new Map();
var megasmileLastCalled = 0;
var megasmileLastUser = '';

function callmegasmile(interaction) {
	const now = Math.floor(Date.now() / 1000);
	commandUsage.set('megasmile', {
		timestamp: now,
		username: interaction.user.username,
	});
	if (now >= megasmileLastCalled + 10800) {
		megasmileLastCalled = commandUsage.get('megasmile').timestamp;
		megasmileLastUser = commandUsage.get('megasmile').username;
		interaction.reply(`<:megasmile:1162087107297280121>`).catch(console.error);
	} else {
		interaction.reply(`<:megasmile:1162087107297280121> was already called by **${megasmileLastUser}**. Please try again <t:${megasmileLastCalled + 10800}:R>.`).catch(console.error);
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('megasmile')
		.setDescription(':megasmile:'),
	execute: callmegasmile
};
