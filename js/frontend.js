"use strict";
import { endpoint, getAlbums, getArtists, getSongs } from "./rest-service.js";

import { inputSearchChanged, inputSearchChangedAlbum, inputSearchChangedSong } from "./helpers.js";
import ListRenderer from "./view/listrenderer.js";
import ArtistRendererRenderer from "./view/artistsrenderer.js";
import { initTabs } from "./tabs.js";
export { artists, albums, songs, displayArtists, displayAlbums, displaySongs };

endpoint;
let artists = [];
let albums = [];
let songs = [];

let artistList = null;
let createDialog = null;
let updateDialog = null;
let confirmDialog = null;
window.addEventListener("load", artistApp);

async function artistApp() {
  console.log("Velkommen til Musik Databasen!");
  
    artists = await getArtists();
    albums = await getAlbums();
    songs = await getSongs();


}

initTabs();

function initializeViews() {

}

//-------------------Update Grid----------------------//

// async function updateGrid() {
//   artists = await getArtists();
//   albums = await getAlbums();
//   songs = await getSongs();
//   displayArtists(artists);
//   displayAlbums(albums);
//   displaySongs(songs);
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
function displayAlbums(listOfAlbums) {
  document.querySelector("#albums").innerHTML = "";
  for (const albums of listOfAlbums) {
    showAlbums(albums);
  }
}

function showAlbums(albumObject) {
  const html = /*html*/ `
    <article class="grid-item">
      <h1>${albumObject.title}</h1>
      <div class="grid-info">
        <h2>${albumObject.releaseDate}</h2>
      </div>
      <div class="btns">
        <button class="btn-update">Update</button>
        <button class="btn-delete">Delete</button>    
      </div>
    </article>
  `;
  document.querySelector("#albums").insertAdjacentHTML("beforeend", html);
}

//------------------- Get Songs  ----------------------//
function displaySongs(listOfSongs) {
  document.querySelector("#songs").innerHTML = "";
  for (const songs of listOfSongs) {
    showSongs(songs);
  }
}

function showSongs(songsObject) {
  const html = /*html*/ `
    <article class="grid-item">
    <h1>${songsObject.title}</h1>
    <div class="grid-info">
    <h2>${songsObject.releaseDate}</h2>
     <h3>${songsObject.length}</h3>
      </div>
      <div class="btns">
        <button class="btn-update">Update</button>
        <button class="btn-delete">Delete</button>    
      </div>
    </article>
  `;
  document.querySelector("#songs").insertAdjacentHTML("beforeend", html);
}
