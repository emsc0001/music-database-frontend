"use strict";
import { endpoint } from "./rest-service.js";
import * as RESTAPI from "./rest-service.js";

import { inputSearchChanged, inputSearchChangedAlbum, inputSearchChangedSong } from "./helpers.js";
import ListRenderer from "./view/listrenderer.js";
import ArtistRenderer from "./view/artistsrenderer.js";
import AlbumRenderer from "./view/albumsrenderer.js";
import SongsRenderer from "./view/songsrenderer.js";

import ArtistShowDialog from "./view/artistshowrenderer.js";
import { ArtistCreateDialog, AlbumCreateDialog, SongCreateDialog } from "./view/createDialog.js";
import { ArtistUpdateDialog, AlbumUpdateDialog, SongUpdateDialog } from "./view/updateDialog.js";
import { ArtistDeleteDialog, AlbumDeleteDialog, SongDeleteDialog } from "./view/dialogDelete.js";

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
}

function initializeViews() {
    artistsLists = new ListRenderer(artists, "#artists-container", ArtistRenderer);
    artistsLists.render();

    albumsLists = new ListRenderer(albums, "#albums-container", AlbumRenderer);
    albumsLists.render();

    songsLists = new ListRenderer(songs, "#songs-container", SongsRenderer);
    songsLists.render();

    const artistItems = document.querySelectorAll("#artists-container article");
    artistItems.forEach((artistItem, index) => {
        artistItem.addEventListener("click", () => {
            const selectedArtist = artists[index];
            console.log("Artist Profile Opened");
            const artistDialog = new ArtistShowDialog(selectedArtist);
            artistDialog.show();
        });
    });

    // ARTIST dialog-components
    createArtistDialog = new ArtistCreateDialog("artist-create-dialog");
    createArtistDialog.render();

    updateArtistDialog = new ArtistUpdateDialog("artist-update-dialog");
    updateArtitstDialog.render();

    deleteArtistDialog = new ArtistDeleteDialog("artist-delete-dialog");
  
    // album dialog-components
    createAlbumDialog = new AlbumCreateDialog("album-create-dialog");
    createalbumDialog.render();

    updateAlbumDialog = new AlbumUpdateDialog("album-update-dialog");
    updateAlbumDialog.render();

    deleteAlbumDialog = new AlbumDeleteDialog("album-delete-dialog");
  
    // SONG dialog-components
    createSongDialog = new SongCreateDialog("song-create-dialog");
  createSongDialog.render();

    updateSongDialog = new SongUpdateDialog("song-update-dialog");
    updateArtitstDialog.render();

    deleteSongDialog = new SongDeleteDialog("song-delete-dialog");
}

initTabs();


// ------------- Controller -------------------//

async function createArtist(artist) {
  await RESTAPI.createArtist(artist);

  artists = await RESTAPI.getAllArtists();
  artistsLists.setList(artists);
  artistsLists.render();
}






//-------------------Update Grid----------------------//

// async function updateGrid() {
//   artists = await getArtists();
//   albums = await getAlbums();
//   songs = await getSongs();
//   console.log(artists);
// }

//------------------- Get Artists  ----------------------//

// function displayArtists(listOfArtist) {
//   document.querySelector("#artists").innerHTML = "";
//   for (const artist of listOfArtist) {
//     showArtists(artist);
//   }
// }

//------------------- Get Albums  ----------------------//
// function displayAlbums(listOfAlbums) {
//   document.querySelector("#albums").innerHTML = "";
//   for (const albums of listOfAlbums) {
//     showAlbums(albums);
//   }
// }

// function showAlbums(albumObject) {
//   const html = /*html*/ `
//     <article class="grid-item">
//       <h1>${albumObject.title}</h1>
//       <div class="grid-info">
//         <h2>${albumObject.releaseDate}</h2>
//       </div>
//       <div class="btns">
//         <button class="btn-update">Update</button>
//         <button class="btn-delete">Delete</button>
//       </div>
//     </article>
//   `;
//   document.querySelector("#albums").insertAdjacentHTML("beforeend", html);
// }

// //------------------- Get Songs  ----------------------//
// function displaySongs(listOfSongs) {
//   document.querySelector("#songs").innerHTML = "";
//   for (const songs of listOfSongs) {
//     showSongs(songs);
//   }
// }

// function showSongs(songsObject) {
//   const html = /*html*/ `
//     <article class="grid-item">
//     <h1>${songsObject.title}</h1>
//     <div class="grid-info">
//     <h2>${songsObject.releaseDate}</h2>
//      <h3>${songsObject.length}</h3>
//       </div>
//       <div class="btns">
//         <button class="btn-update">Update</button>
//         <button class="btn-delete">Delete</button>
//       </div>
//     </article>
//   `;
//   document.querySelector("#songs").insertAdjacentHTML("beforeend", html);
// }

export { artists, albums, songs };