const { SlashCommandBuilder, EmbedBuilder, Client, Intents, IntentsBitField } = require('discord.js');
//const { client } = require('../../index');
const commandUsage = new Map();
var burgerLastCalled = 0;
var burgerLastUser = '';

function callBurger(interactionOrMessage) {
	const now = Math.floor(Date.now() / 1000);
	const username = interactionOrMessage.user ? interactionOrMessage.user.username : interactionOrMessage.author.username;
	commandUsage.set('burger', {
		timestamp: now,
		username: username,
	});
	if (now >= burgerLastCalled + 21600) {
		burgerLastCalled = commandUsage.get('burger').timestamp;
		burgerLastUser = commandUsage.get('burger').username;
		interactionOrMessage.reply(`:hamburger:`).catch(console.error);
	} else {
		interactionOrMessage.reply(`:hamburger: was already called by **${burgerLastUser}**. Please try again <t:${burgerLastCalled + 21600}:R>.`).catch(console.error);
	}
}

module.exports.callBurger = callBurger;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('burger')
		.setDescription('Classic burber'),
	async execute(interaction) {
		callBurger(interaction);
		console.log("Burger called via slash command.");
	}
};
