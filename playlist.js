const fs = require('fs');

let playlists = new Map();

function savePlaylists() {
    let jsonObject = {};
    for (let [key, value] of playlists.entries()) {
        jsonObject[key] = value;
    }

    fs.writeFileSync('playlists.json', JSON.stringify(jsonObject));
}

function loadPlaylists() {
    if (fs.existsSync('playlists.json')) {
        try {
            let data = fs.readFileSync('playlists.json', 'utf-8');
            let rawObject = JSON.parse(data);
            let loadedMap = new Map(Object.entries(rawObject));
            playlists = loadedMap;
        } catch (err) {
            console.error('Failed to parse playlists.json:', err);
        }
    }
}

module.exports.removeSong = function (guildId, songUrl) {
    const playlist = playlists.get(guildId);
    if (!playlist) {
        throw new Error('No playlist for this guild.');
    }

    const songIndex = playlist.indexOf(songUrl);
    if (songIndex === -1) {
        throw new Error('Song not found in playlist.');
    }

    playlist.splice(songIndex, 1);
}


module.exports.addSong = function (guildId, songUrl) {
    if (!playlists.has(guildId)) {
        playlists.set(guildId, []);
    }
    playlists.get(guildId).push(songUrl);
    savePlaylists();
}

module.exports.getNextSong = function (guildId) {
    if (!playlists.has(guildId)) {
        return null;
    }
    const playlist = playlists.get(guildId);
    const song = playlist.shift();
    savePlaylists();
    return song;
}

module.exports.getPlaylist = function (guildId) {
    return playlists.get(guildId);
}


loadPlaylists();
