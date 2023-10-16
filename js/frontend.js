"use strict";
import { endpoint } from "./rest-service.js";
import * as RESTAPI from "./rest-service.js";
import { inputSearchChanged, inputSearchChangedAlbum, inputSearchChangedSong } from "./helpers.js";
import ListRenderer from "./view/listrenderer.js";
import ArtistRenderer from "./view/artistsrenderer.js";
import { initTabs } from "./tabs.js";
export { artists, albums, songs };

endpoint;

//models
let artists = [];
let albums = [];
let songs = [];

// views
let artistsLists = null;
// let albumsLists = null;
// let songsLists = null;

window.addEventListener("load", artistApp);

async function artistApp() {
  console.log("Velkommen til Musik Databasen!");
  artists = await RESTAPI.getAllArtists();
  // albums = await RESTAPI.getAlbums();
  // songs = await RESTAPI.getSongs();

  // create views
  initializeViews();
}

function initializeViews() {
  artistsLists = new ListRenderer(artists, "#artist-container", ArtistRenderer);
  artistsLists.render();
}

initTabs();

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
