const {SlashCommandBuilder } = require('discord.js');
const { skipToNextSong } = require('../playerManager.js');

async function execute(interaction) {
    await interaction.deferReply();
        try {
            await skipToNextSong(interaction);
            await interaction.followUp('Playing the next song from the playlist');
        } catch (error) {
            console.error(`Error in play command: ${error.message}`);
            await interaction.followUp(`Failed to play the song: ${error.message}`);
        }
}

module.exports = {
    data : new SlashCommandBuilder()
    .setName('skip')
    .setDescription('go to next song'),
execute
};
