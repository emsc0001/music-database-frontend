"use strict";
import artists from "./model/artists.js";

export { endpoint, getAllArtists };

const endpoint = "http://localhost:3333";

let allArtists = [];
let lastFetch = 0;

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
