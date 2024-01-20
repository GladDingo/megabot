const { SlashCommandBuilder, EmbedBuilder, Client, Intents } = require('discord.js');
const commandUsage = new Map();
var megasmileburgerLastCalled = 0;
var megasmileburgerLastUser = '';

function callmegasmileburger(interaction) {
	const now = Math.floor(Date.now() / 1000);
	commandUsage.set('megasmileburger', {
		timestamp: now,
		username: interaction.user.username,
	});
	if (now >= megasmileburgerLastCalled + 64800) {
		megasmileburgerLastCalled = commandUsage.get('megasmileburger').timestamp;
		megasmileburgerLastUser = commandUsage.get('megasmileburger').username;
		interaction.reply(`<:megasmileburger:1190887158114951188>`).catch(console.error);
	} else {
		interaction.reply(`<:megasmileburger:1190887158114951188> was already called by **${megasmileburgerLastUser}**. Please try again <t:${megasmileburgerLastCalled + 64800}:R>.`).catch(console.error);
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('megasmileburger')
		.setDescription('The ultimate one. Combination of :megasmile: and 🍔.'),
	execute: callmegasmileburger
};