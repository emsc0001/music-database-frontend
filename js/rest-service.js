"use strict";
import artists from "./model/artists.js";
import albums from "./model/albums.js";
import songs from "./model/songs.js";

export {
  endpoint,
  getAllArtists,
  getAllAlbums,
  getAllSongs,
  createArtist,
  updateArtist,
  deleteArtist,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  createSong,
  updateSong,
  deleteSong,
};

const endpoint = "http://https://music-database.azurewebsites.net";

let allArtists = [];
let allAlbums = [];
let allSongs = [];
let lastFetch = 0;
let lastFetch1 = 0;
let lastFetch2 = 0;

// -----ALL API with Artist-------- //
async function getAllArtists() {
  const now = Date.now();
  const timePassedSinceLastFetch = now - lastFetch;
  // Only fetch if more than 10 seconds has passed since last fetch
  if (timePassedSinceLastFetch > 10_000) {
    // <- hardcoded time - should maybe be something different
    await refetchAllArtists();
  }
  return allArtists;
}

async function refetchAllArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const originalJson = await response.json();
  allArtists = originalJson.map((jsonObj) => new artists(jsonObj));

  lastFetch = Date.now();
}

// Create Artist//

async function createArtist(artist) {
  const json = JSON.stringify(artist);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });

  await refetchAllArtists();

  return response.ok;
}
// Update Artist//

async function updateArtist(artist) {
  const json = JSON.stringify(artist);
  const response = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });

  await refetchAllArtists();

  return response.ok;
}

// Delete Artist//

async function deleteArtist(artist) {
  const response = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "DELETE",
  });

  await refetchAllArtists();

  return response.ok;
}

// -----ALL API with Albums-------- //

async function getAllAlbums() {
  try {
    const now = Date.now();
    const timePassedSinceLastFetch = now - lastFetch1;
    // Only fetch if more than 10 seconds has passed since the last fetch
    if (timePassedSinceLastFetch > 10_000) {
      await refetchAllAlbums();
    }
    return allAlbums;
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw error; // Rethrow the error for further handling
  }
}

async function refetchAllAlbums() {
  try {
    const response = await fetch(`${endpoint}/albums`);
    const originalJson = await response.json();
    allAlbums = originalJson.map((jsonObj) => new albums(jsonObj)); // Use the correct class name
    lastFetch1 = Date.now();
  } catch (error) {
    console.error("Error refetching albums:", error);
    throw error; // Rethrow the error for further handling
  }
}

async function createAlbum(album) {
  const json = JSON.stringify(album);
  const response = await fetch(`${endpoint}/albums`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });

  await refetchAllAlbums();

  return response.ok;
}

// Update Album//

async function updateAlbum(album) {
  const json = JSON.stringify(album);
  const response = await fetch(`${endpoint}/albums/${album.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });

  await refetchAllAlbums();

  return response.ok;
}

// Delete Album//

async function deleteAlbum(album) {
  const response = await fetch(`${endpoint}/albums/${album.id}`, {
    method: "DELETE",
  });

  await refetchAllAlbums();

  return response.ok;
}

// -----ALL API with songs-------- //

async function getAllSongs() {
  try {
    const now = Date.now();
    const timePassedSinceLastFetch = now - lastFetch2;

    // Only fetch if more than 10 seconds has passed since the last fetch
    if (timePassedSinceLastFetch > 10_000) {
      await refetchAllSongs();
    }

    return allSongs;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
}

async function refetchAllSongs() {
  try {
    const response = await fetch(`${endpoint}/songs`);
    const originalJson = await response.json();
    allSongs = originalJson.map((jsonObj) => new songs(jsonObj));
    lastFetch2 = Date.now();
  } catch (error) {
    console.error("Error refetching songs:", error);
    // You can handle the error here, such as showing a message to the user.
  }
}

async function createSong(song) {
  const json = JSON.stringify(song);
  const response = await fetch(`${endpoint}/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });

  await refetchAllSongs();

  return response.ok;
}

// Update Song//

async function updateSong(song) {
  const json = JSON.stringify(song);
  const response = await fetch(`${endpoint}/songs/${song.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });

  await refetchAllSongs();

  return response.ok;
}

// Delete Song//

async function deleteSong(song) {
  const response = await fetch(`${endpoint}/songs/${song.id}`, {
    method: "DELETE",
  });

  await refetchAllSongs();

  return response.ok;
}
