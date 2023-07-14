const { SlashCommandBuilder } = require('discord.js');
const { playNextSong} = require('../playerManager.js');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('play')
            .setDescription('Plays a song from the playlist'),
    async execute(interaction) {
        await interaction.deferReply()
        try {
            await playNextSong(interaction)
            await interaction.followUp('Playing the next song from the playlist')
        } catch (error) {
            console.error(`Error in play command: ${error.message}`)
            interaction.reply('The playlist is empty,please use /add to add song')
        }
    }
};
