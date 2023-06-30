const { SlashCommandBuilder } = require('discord.js')
const { stopPlaying } = require('../playlist.js')

module.exports = {
    data : new SlashCommandBuilder()
        .setName('stop')
        .setDescription('stop play song'),
    async execute(interaction){
        stopPlaying(interaction)
    }
}