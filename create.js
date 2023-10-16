"use strict";

import { createArtist, createAlbum, createSong } from '';




// Function for creating artists
function CreateArtistDialog(event) {
  const dialog = document.querySelector("dialog#create-artist-dialog");
  document.querySelector("#create-artist-form").addEventListener("submit", submitCreateArtistForm);
  dialog.showModal();
}

async function submitCreateArtistForm(event) {
  console.log("Submit create artist form");

  event.preventDefault();

  const form = event.target;
  const inputs = form.elements;

  // Create an artist object with the relevant attributes
  const artist = {
    name: inputs.name.value,
    genre: inputs.genre.value,
    // Add other relevant attributes for artists
  };

  // Call the function to create an artist in your backend
  const createdArtist = await createArtist(artist);

  if (createdArtist) {
    console.log("Artist created successfully:", createdArtist);
    // Update your frontend to display the newly created artist
    displayUpdatedArtistList();
  } else {
    console.error("Error during artist creation.");
  }
}

// Function for creating albums
function CreateAlbumDialog(event) {
  const dialog = document.querySelector("dialog#create-album-dialog");
  document.querySelector("#create-album-form").addEventListener("submit", submitCreateAlbumForm);
  dialog.showModal();
}

async function submitCreateAlbumForm(event) {
  console.log("Submit create album form");

  event.preventDefault();

  const form = event.target;
  const inputs = form.elements;

  // Create an album object with the relevant attributes
  const album = {
    title: inputs.title.value,
    releaseDate: inputs.releaseDate.value,
    // Add other relevant attributes for albums
  };

  // Call the function to create an album in your backend
  const createdAlbum = await createAlbum(album);

  if (createdAlbum) {
    console.log("Album created successfully:", createdAlbum);
    // Update your frontend to display the newly created album
    displayUpdatedAlbumList();
  } else {
    console.error("Error during album creation.");
  }
}

// Function for creating songs
function CreateSongDialog(event) {
  const dialog = document.querySelector("dialog#create-song-dialog");
  document.querySelector("#create-song-form").addEventListener("submit", submitCreateSongForm);
  dialog.showModal();
}

async function submitCreateSongForm(event) {
  console.log("Submit create song form");

  event.preventDefault();

  const form = event.target;
  const inputs = form.elements;

  // Create a song object with the relevant attributes
  const song = {
    title: inputs.title.value,
    duration: inputs.duration.value,
    // Add other relevant attributes for songs
  };

  // Call the function to create a song in your backend
  const createdSong = await createSong(song);

  if (createdSong) {
    console.log("Song created successfully:", createdSong);
    // Update your frontend to display the newly created song
    displayUpdatedSongList();
  } else {
    console.error("Error during song creation.");
  }
}


export { CreateArtistDialog, CreateAlbumDialog, CreateSongDialog };
