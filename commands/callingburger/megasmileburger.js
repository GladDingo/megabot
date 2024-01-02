const { SlashCommandBuilder } = require('discord.js');
const commandUsage = new Map();
var megasmileburgerLastCalled = 0;
var megasmileburgerLastUser = '';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('megasmileburger')
		.setDescription('The ultimate emoji.'),
	async execute(interaction) {

		const now = Math.floor(Date.now() / 1000);
		commandUsage.set('megasmileburger', {
			timestamp: now,
			username: interaction.user.username,
		});
		if (now >= megasmileburgerLastCalled + 43200) {
			megasmileburgerLastCalled = commandUsage.get('megasmileburger').timestamp;
			megasmileburgerLastUser = commandUsage.get('megasmileburger').username;
			await interaction.reply(`<:megasmileburger:1190887158114951188>`);
		} else {
			await interaction.reply(`<:megasmileburger:1190887158114951188> was already called by **${megasmileburgerLastUser}**. Please try again <t:${megasmileburgerLastCalled + 43200}:R>.`);
		}
	},
};