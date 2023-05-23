const {showplaylist} = require('../playlist.js')
const {SlashCommandBuilder,PermissionFlagsBits} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('show_playlist')
            .setDescription('show play list in terminal')
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const playlist = showplaylist(guildId);
        console.log(playlist)
        await interaction.reply('list in terminal')
    },
}