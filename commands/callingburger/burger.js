const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const commandUsage = new Map();
var burgerLastCalled = 0;
var burgerLastUser = '';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('burger')
		.setDescription('Classic burber'),
	async execute(interaction) {
		const now = Math.floor(Date.now() / 1000);
		commandUsage.set('burger', {
			timestamp: now,
			username: interaction.user.username,
		});
		if (now >= burgerLastCalled + 10800) {
			burgerLastCalled = commandUsage.get('burger').timestamp;
			burgerLastUser = commandUsage.get('burger').username;
			await interaction.reply(`:hamburger:`);
		} else {
			await interaction.reply(`:hamburger: was already called by **${burgerLastUser}**. Please try again <t:${burgerLastCalled + 10800}:R>.`);
		}
	},
};