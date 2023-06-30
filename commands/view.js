const { SlashCommandBuilder } = require('discord.js')
const { getPlaylist } = require('../playlist.js')

async function viewPlaylist(interaction) {
    const playlist = getPlaylist(interaction.guild.id)
    if (playlist.length === 0) {
        await interaction.reply('The playlist is empty.')
    } else {
        await interaction.reply('The playlist is:\n' + playlist.join('\n'))
    }
}

module.exports = {
    data : new SlashCommandBuilder()
        .setName('view')
        .setDescription('View the current playlist'),
    async execute(interaction){
        return viewPlaylist(interaction)
    }
}
