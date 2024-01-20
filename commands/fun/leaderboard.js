const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('See leaderboard for burger, megasmile, or megasmileburger'),
    async execute(interaction) {
        var burgerLeaderboard = new EmbedBuilder()
            .setColor(0xd4af37)
            .setTitle(":trophy: Leaderboards")
            .addFields(
                { name: ' ', value: '🥇 **user**  0 :hamburger:' },
                { name: ' ', value: '🥈 **user**  0 :hamburger:' },
                { name: ' ', value: '🥉 **user**  0 :hamburger:' },
                { name: ' ', value: '` 4 ` **user**  0 :hamburger:' },
            )
        var megasmileLeaderboard = new EmbedBuilder()
            .setColor(0xd4af37)
            .setTitle(":trophy: Leaderboards")
            .addFields(
                { name: ' ', value: '🥇 **user**  0 <:megasmile:1162087107297280121>' },
                { name: ' ', value: '🥈 **user**  0 <:megasmile:1162087107297280121>' },
                { name: ' ', value: '🥉 **user**  0 <:megasmile:1162087107297280121>' },
                { name: ' ', value: '` 4 ` **user**  0 <:megasmile:1162087107297280121>' },
            )
        var megasmileburgerLeaderboard = new EmbedBuilder()
            .setColor(0xd4af37)
            .setTitle(":trophy: Leaderboards")
            .addFields(
                { name: ' ', value: '🥇 **user**  0 <:megasmileburger:1190887158114951188>' },
                { name: ' ', value: '🥈 **user**  0 <:megasmileburger:1190887158114951188>' },
                { name: ' ', value: '🥉 **user**  0 <:megasmileburger:1190887158114951188>' },
                { name: ' ', value: '` 4 ` **user**  0 <:megasmileburger:1190887158114951188>' },
            )
        const select = new StringSelectMenuBuilder()
            .setCustomId('starter')
            .setPlaceholder('Make a selection!')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('burger')
                    .setDescription('Classic burber')
                    .setValue('burger')
                    .setEmoji('🍔')
                    .setDefault(true),
                new StringSelectMenuOptionBuilder()
                    .setLabel(':megasmile:')
                    .setDescription('Megasmile!')
                    .setValue('megasmile')
                    .setEmoji('1162087107297280121'),
                new StringSelectMenuOptionBuilder()
                    .setLabel(':megasmileburger:')
                    .setDescription('Megasmileburger!')
                    .setValue('megasmileburger')
                    .setEmoji('1190887158114951188'),
            );

        const row = new ActionRowBuilder().addComponents(select);

        const initialReply = await interaction.reply({
            content: 'Please select an option:',
            components: [row],
        });

        const filter = (interaction) => interaction.customId === 'select';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async (interaction) => {
            const selectedValue = interaction.values[0];
            let embedToSend;

            switch (selectedValue) {
                case 'burger':
                    embedToSend = burgerLeaderboard;
                    break;
                case 'megasmile':
                    embedToSend = megasmileLeaderboard;
                    break;
                // Add cases for other selections if needed
                default:
                    embedToSend = burgerLeaderboard; // Default to burger
                    break;
            }

            await interaction.update({ embeds: [embedToSend], components: [] });
            collector.stop();
        });

        collector.on('end', () => {
            if (initialReply && !initialReply.deleted) {
                initialReply.edit({ components: [] });
            }
        });
    },
};