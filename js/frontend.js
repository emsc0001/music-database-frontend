"use strict";
import { endpoint } from "./rest-service.js";
import * as RESTAPI from "./rest-service.js";

import ListRenderer from "./view/listrenderer.js";
import ArtistRenderer from "./view/artistsrenderer.js";
import AlbumRenderer from "./view/albumsrenderer.js";
import SongsRenderer from "./view/songsrenderer.js";

import { ArtistCreateDialog, AlbumCreateDialog, SongCreateDialog } from "./view/createDialog.js";
import { ArtistUpdateDialog, AlbumUpdateDialog, SongUpdateDialog } from "./view/updateDialog.js";
import { ArtistDeleteDialog, AlbumDeleteDialog, SongDeleteDialog } from "./view/dialogDelete.js";
import { selectSearch, searchList } from "./view/search.js";

import { initTabs } from "./tabs.js";

endpoint;

//models
let artists = [];
let albums = [];
let songs = [];

// views
let artistsLists = null;
let albumsLists = null;
let songsLists = null;

let createArtistDialog = null;
let updateArtistDialog = null;
let deleteArtistDialog = null;

let createAlbumDialog = null;
let updateAlbumDialog = null;
let deleteAlbumDialog = null;

let createSongDialog = null;
let updateSongDialog = null;
let deleteSongDialog = null;

window.addEventListener("load", artistApp);

async function artistApp() {
  console.log("Velkommen til Musik Databasen!");
  artists = await RESTAPI.getAllArtists();
  albums = await RESTAPI.getAllAlbums();
  songs = await RESTAPI.getAllSongs();

  console.log("Number of artists:", artists.length);
  console.log("Number of albums:", albums.length);
  console.log("Number of songs:", songs.length);

  // create views
  initializeViews();
  initializeActionButtons();

  document.addEventListener("DOMContentLoaded", () => {
      const searchInput = document.getElementById("input-search-artist");
      searchInput.addEventListener("input", handleSearch);
  });
}

function initializeViews() {
  artistsLists = new ListRenderer(artists, "#artists-container", ArtistRenderer);
  artistsLists.render();

  albumsLists = new ListRenderer(albums, "#albums-container", AlbumRenderer);
  albumsLists.render();

  songsLists = new ListRenderer(songs, "#songs-container", SongsRenderer);
  songsLists.render();

  // ARTIST dialog-components
  createArtistDialog = new ArtistCreateDialog("artist-create-dialog");
  createArtistDialog.render();

  updateArtistDialog = new ArtistUpdateDialog("artist-update-dialog");
  updateArtistDialog.render();

  deleteArtistDialog = new ArtistDeleteDialog("artist-delete-dialog");

  // album dialog-components
  createAlbumDialog = new AlbumCreateDialog("album-create-dialog");
  createAlbumDialog.render();

  updateAlbumDialog = new AlbumUpdateDialog("album-update-dialog");
  updateAlbumDialog.render();

  deleteAlbumDialog = new AlbumDeleteDialog("album-delete-dialog");

  // SONG dialog-components
  createSongDialog = new SongCreateDialog("song-create-dialog");
  createSongDialog.render();

  updateSongDialog = new SongUpdateDialog("song-update-dialog");
  updateSongDialog.render();

  deleteSongDialog = new SongDeleteDialog("song-delete-dialog");

  // initialize create-button for Artists
  document
    .querySelectorAll("[data-action='createArtist']")
    .forEach((button) => button.addEventListener("click", createArtistDialog.show.bind(createArtistDialog)));

  // initialize create-button for Albums
  document
    .querySelectorAll("[data-action='createAlbum']")
    .forEach((button) => button.addEventListener("click", createAlbumDialog.show.bind(createAlbumDialog)));

  // initialize create-button for Songs
  document
    .querySelectorAll("[data-action='createSong']")
    .forEach((button) => button.addEventListener("click", createSongDialog.show.bind(createSongDialog)));

  // initialize delete-button for Artist
  document
    .querySelectorAll("[data-action='deleteArtist1']")
    .forEach((button) => button.addEventListener("click", deleteArtistDialog.show.bind(deleteArtistDialog)));

  //   document.querySelectorAll("[data-action='deleteArtist1']").forEach((button) => button.addEventListener("click", deleteArtistDialog));

  // initialize update-button
  document
    .querySelectorAll("[data-action='updateArtist']")
    .forEach((button) => button.addEventListener("click", updateArtistDialog.show.bind(updateArtistDialog)));

  document
    .querySelectorAll("[data-action='updateAlbum']")
    .forEach((button) => button.addEventListener("click", updateAlbumDialog.show.bind(updateAlbumDialog)));

  document
    .querySelectorAll("[data-action='updateSong']")
    .forEach((button) => button.addEventListener("click", updateSongDialog.show.bind(updateSongDialog)));

  // Usage for creating the artist dropdown
  populateDropdown("#create-album-artist", artists);

  // Usage for creating the album dropdown (if it exists)
  populateDropdown("#create-song-artist", artists);
  populateDropdown("#create-song-album", albums);

  // initialize Sort-button
  document.querySelectorAll("[data-action='sort']").forEach((button) =>
    button.addEventListener("click", () => {
      // before sorting - remove .selected from previous selected header
      document.querySelector("[data-action=sort].selected")?.classList.remove("selected");

      artistsLists.sort(button.dataset.sortBy, button.dataset.sortDirection);

      // indicate selected sort header
      button.classList.add("selected");
      // indicate sort-direction on button
      button.dataset.sortDirection = artistsLists.sortDir;
    })
  );

  // initialize Filter-button
  document.querySelectorAll("[data-action='filter']").forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.dataset.filter;

      if (filterValue !== "*") {
        filterArtistsByGenre(filterValue);
      } else {
        filterArtistsByGenre("");
      }
    });
  });
}

function filterArtistsByGenre(genre) {
  if (genre === "") {
    // If genre is empty, clear the filter and show all artists
    artistsLists.filter("*", "*");
  } else {
    // Call the filter function on the artistsLists object
    artistsLists.filter("genres", genre);
  }
}

// initialize Search-Option

function initializeActionButtons() {
  document.querySelectorAll("[data-action='search']").forEach((field) => {
    field.addEventListener("input", selectSearch);
    field.addEventListener("keyup", selectSearch);
    field.addEventListener("change", selectSearch);
  });
}

async function updatedListArtist(data) {

  const artists = data.artists
  console.log(artists);
   artistsLists = new ListRenderer(artists, "#artists-container", ArtistRenderer);
  artistsLists.render();
}

initTabs();


// ---Search----//

async function handleSearch() {
  // Get the search query from the input field
  const searchQuery = document.getElementById('input-search-artist').value;

  // Send a request to the backend if the query is not empty
  if (searchQuery) {

    console.log(searchQuery);
    const response = await fetch(`${endpoint}/search?q=${searchQuery}`);

    if (response.ok) {
      const data = await response.json();

      updatedListArtist(data)

    } else {
      console.error('Search request failed');
    }
  } 
}




// -----Fills the dropdown in Dialog----- //

function populateDropdown(selector, data) {
  const dropdown = document.querySelector(selector);

  if (!dropdown) return; // Ensure the dropdown exists

  // Clear existing options
  dropdown.innerHTML = "";

  // Iterate through the data and create option elements
  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name || item.title; // Adjust this according to your data structure
    dropdown.appendChild(option);
  });
}

// ------------- Controller -------------------//

async function createArtist(artist) {
  await RESTAPI.createArtist(artist);

  artists = await RESTAPI.getAllArtists();
  artistsLists.setList(artists);
  artistsLists.render();
}

function selectArtistForUpdate(artist) {
  updateArtistDialog.setArtist(artist);
  updateArtistDialog.show();
}

async function updateArtist(artist) {
  // call rest-api
  await RESTAPI.updateArtist(artist);

  // update list
  artists = await RESTAPI.getAllArtists();
  artistsLists.setList(artists);
  artistsLists.render();
}

async function updateSingleArtistProperty(artist, property, value) {
  await RESTAPI.patchArtist(artist, property, value);
  // Do not re-render the entire list for a single property - expect the View to re-render itself!
}

function confirmDeleteArtist(artist) {
  deleteArtistDialog.setArtist(artist);
  deleteArtistDialog.render();
  deleteArtistDialog.show();
}

async function deleteArtist(artist) {
  await RESTAPI.deleteArtist(artist);

  // update list
  artist = await RESTAPI.getAllArtists();
  artistsLists.setList(artist);
  artistsLists.render();
}

// Albums
async function createAlbum(album) {
  await RESTAPI.createAlbum(album);

  albums = await RESTAPI.getAllAlbums();
  albumsLists.setList(albums);
  albumsLists.render();
}

function selectAlbumForUpdate(album) {
  updateAlbumDialog.setAlbum(album);
  updateAlbumDialog.show();
}

async function updateAlbum(album) {
  // call rest-api
  await RESTAPI.updateAlbum(album);

  // update list
  albums = await RESTAPI.getAllAlbums();
  albumsLists.setList(albums);
  albumsLists.render();
}

async function updateSingleAlbumProperty(album, property) {
  await RESTAPI.patchArtist(album, property, album[property]);
  // Do not re-render the entire list for a single property - expect the View to re-render itself!
}

function confirmDeleteAlbum(album) {
  deleteAlbumDialog.setAlbum(album);
  deleteAlbumDialog.render();
  deleteAlbumDialog.show();
}

async function deleteAlbum(album) {
  await RESTAPI.deleteAlbum(album);

  // update list
  albums = await RESTAPI.getAllAlbums();
  albumsLists.setList(albums);
  albumsLists.render();
}

// Songs

async function createSong(song) {
  await RESTAPI.createSong(song);

  songs = await RESTAPI.getAllSongs();
  songsLists.setList(songs);
  songsLists.render();
}

function selectSongForUpdate(song) {
  updateSongDialog.setSong(song);
  updateSongDialog.show();
}

async function updateSong(song) {
  // call rest-api
  await RESTAPI.updateSong(song);

  // update list
  songs = await RESTAPI.getAllSongs();
  songsLists.setList(songs);
  songsLists.render();
}

async function updateSingleSongProperty(song, property) {
  await RESTAPI.patchArtist(song, property, song[property]);
  // Do not re-render the entire list for a single property - expect the View to re-render itself!
}

function confirmDeleteSong(song) {
  deleteSongDialog.setSong(song);
  deleteSongDialog.render();
  deleteSongDialog.show();
}

async function deleteSong(song) {
  await RESTAPI.deleteSong(song);

  // update list
  songs = await RESTAPI.getAllSongs();
  songsLists.setList(songs);
  songsLists.render();
}

export {
  artists,
  albums,
  songs,
  createArtist,
  selectArtistForUpdate,
  selectAlbumForUpdate,
  selectSongForUpdate,
  confirmDeleteAlbum,
  deleteAlbum,
  deleteSong,
  confirmDeleteSong,
  updateArtist,
  updatedListArtist,
  updateAlbum,
  updateSong,
  confirmDeleteArtist,
  deleteArtist,
  createAlbum,
  createSong,
  updateSingleArtistProperty,
  updateSingleAlbumProperty,
  updateSingleSongProperty,
  initializeActionButtons,
};
