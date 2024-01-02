const { SlashCommandBuilder } = require('discord.js');
const commandUsage = new Map();
var megasmileLastCalled = 0;
var megasmileLastUser = '';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('megasmile')
		.setDescription(':megasmile:'),
	async execute(interaction) {

		const now = Math.floor(Date.now() / 1000);
		commandUsage.set('megasmile', {
			timestamp: now,
			username: interaction.user.username,
		});
		if (now >= megasmileLastCalled + 21600) {
			megasmileLastCalled = commandUsage.get('megasmile').timestamp;
			megasmileLastUser = commandUsage.get('megasmile').username;
			await interaction.reply(`<:megasmile:1162087107297280121>`);
		} else {
			await interaction.reply(`<:megasmile:1162087107297280121> was already called by **${megasmileLastUser}**. Please try again <t:${megasmileLastCalled + 21600}:R>.`);
		}
	},
};