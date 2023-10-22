"use strict";
import { endpoint } from "./rest-service.js";
import * as RESTAPI from "./rest-service.js";

import ListRenderer from "./view/renderer/listrenderer.js";
import ArtistRenderer from "./view/renderer/artistsrenderer.js";
import AlbumRenderer from "./view/renderer/albumsrenderer.js";
import SongRenderer from "./view/renderer/songsrenderer.js";

import { ArtistCreateDialog, AlbumCreateDialog, SongCreateDialog } from "./view/dialogs/createDialog.js";
import { ArtistUpdateDialog, AlbumUpdateDialog, SongUpdateDialog } from "./view/dialogs/updateDialog.js";
import { ArtistDeleteDialog, AlbumDeleteDialog, SongDeleteDialog } from "./view/dialogs/dialogDelete.js";
import { handleSearch } from "./view/helpers/search.js";

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
    initTabs();
}

function initializeViews() {
    artistsLists = new ListRenderer(artists, "#artists-container", ArtistRenderer);
    artistsLists.render();

    albumsLists = new ListRenderer(albums, "#albums-container", AlbumRenderer);
    albumsLists.render();

    songsLists = new ListRenderer(songs, "#songs-container", SongRenderer);
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
    document.querySelectorAll("[data-action='sort']").forEach((button) => {
        button.addEventListener("click", () => {
            // before sorting - remove .selected from previous selected header
            document.querySelector("[data-action=sort].selected")?.classList.remove("selected");

            // Determine the type of list based on button attributes
            const listType = button.dataset.sortList;
            let listToSort;

            if (listType === "artists") {
                listToSort = artistsLists;
            } else if (listType === "albums") {
                listToSort = albumsLists;
            } else if (listType === "songs") {
                listToSort = songsLists;
            } else {
                // Handle this according to your structure
            }

            if (listToSort) {
                listToSort.sort(button.dataset.sortBy, button.dataset.sortDirection);
                
                // indicate selected sort header
                button.classList.add("selected");
                // indicate sort-direction on button
                button.dataset.sortDirection = listToSort.sortDir;
              }
            });
          });
          
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
    
    // -----Search EventListener------//
    
document.addEventListener("DOMContentLoaded", () => {
  const searchInputs = document.querySelectorAll("[data-search-type]");
  searchInputs.forEach((input) => {
    console.log("hey");
    input.addEventListener("input", handleSearch);
      });
    });
    
    
async function updatedList(items, containerSelector, renderer) {
    const container = document.querySelector(containerSelector);

    if (!items || items.length === 0) {
        container.innerHTML = "No results found.";
        return;
    }

    const listRenderer = new ListRenderer(items, containerSelector, renderer);
    listRenderer.render();
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
    updatedList,
    updateAlbum,
    updateSong,
    confirmDeleteArtist,
    deleteArtist,
    createAlbum,
    createSong,
};
