const { SlashCommandBuilder } = require('discord.js');
const { removeSong } = require('../playlist.js')

async function removeFromPlaylist(interaction) {
    const songUrl = interaction.options.getString('url');
    removeSong(interaction.guild.id, songUrl);
    await interaction.reply(`Removed ${songUrl} from the playlist.`);
}

module.exports = {
    data: new SlashCommandBuilder()
            .setName('remove')
            .setDescription('Remove a song from the playlist')
            .addStringOption(option => 
                option.setName('url')
                .setDescription('The URL of the song to remove from the playlist')
                .setRequired(true)),
    async execute(interaction){
        return removeFromPlaylist(interaction)
    },
}
