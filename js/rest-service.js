"use strict";
import artists from "./model/artists.js";
import albums from "./model/albums.js";
import songs from "./model/songs.js";

export { endpoint, getAllArtists, getAllAlbums, getAllSongs, createArtist };

const endpoint = "http://localhost:3333";

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
    // NOTE: Should we return the newly created id?
    return response.ok;
}



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
    // You can handle the error here, such as showing a message to the user.
    // Return an empty array or some default value, depending on your application's logic.
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

// async function getArtists() {
//   const response = await fetch(`${endpoint}/artists`);
//   const data = await response.json();
//   return data;
// }

// async function getAlbums() {
//   const response = await fetch(`${endpoint}/albums`);
//   const data = await response.json();
//   return data;
// }

// async function getSongs() {
//   const response = await fetch(`${endpoint}/songs`);
//   const data = await response.json();
//   return data;
// }
