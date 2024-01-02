const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('See leaderboard for burger, megasmile, or megasmileburger'),
    async execute(interaction) {
        var leaderboard = new EmbedBuilder()
            .setColor(d4af37)
            .setTitle(":trophy: Leaderboards")

        await interaction.reply({ embeds: [leaderboard] });
    },
};