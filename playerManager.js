const {
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    demuxProbe,
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { getNextSong } = require('./playlist.js'); // assume this function is implemented in playlist.js

let player = null;
let connection = null;

function createVoiceConnection(interaction) {
    const channelId = interaction.member.voice.channelId;
    const channel = interaction.guild.channels.resolve(channelId);

    if (!channel) {
        throw new Error('You need to join a voice channel first!');
    }

    return joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
}

function createStream(songUrl) {
    return ytdl(songUrl, {
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1 << 25, // 32MB
    });
}

async function createResource(stream) {
    const { stream: outputStream, type } = await demuxProbe(stream);

    return createAudioResource(outputStream, {
        inputType: type,
        channels: 2,
        inlineVolume: true,
    });
}

async function playNextSong(interaction) {
    const songUrl = getNextSong(interaction.guild.id);
    
    if (songUrl) {
        const connection = createVoiceConnection(interaction);
        const player = createAudioPlayer();
        const stream = createStream(songUrl);
        const resource = await createResource(stream);
    
        connection.subscribe(player);
        player.play(resource);
    
        player.on('error', error => {
            console.error(`Error from audio player: ${error.message}`);
        })
    
        player.on('idle', async () => {
            connection.destroy();
            // play the next song in the playlist
            const nextSongUrl = getNextSong(interaction.guild.id);
            if (nextSongUrl) {
                await playNextSong(interaction); 
            }
        });
    } else {
        throw new Error('The playlist is empty.');
    }
}

function stopPlaying() {
    if (player) {
        player.stop();
        player = null;
    }
    if (connection) {
        connection.disconnect();
        connection = null;
    }
}

async function skipToNextSong(interaction) {
    stopPlaying();
    await playNextSong(interaction);
}

module.exports = {
    playNextSong,
    stopPlaying,
    skipToNextSong,
};
