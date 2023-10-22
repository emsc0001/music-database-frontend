import { artists } from "../frontend.js";

let searchTerm = "";
let searchType = "all";

function selectSearch(event) {
  const enteredTerm = document.querySelector("#searchField").value.toLowerCase().trim();
  const selectedType = document.querySelector("#searchType").value;

  // The selectSearch gets a lot of events, so only continue if actually changed
  if (enteredTerm !== searchTerm || selectedType !== searchType) {
    setSearch(enteredTerm, selectedType);
    updatedListArtist();
  }
}

function setSearch(term, type) {
  searchTerm = term;
  searchType = type;
}

function searchList(artists) {
  if (searchTerm.length === 0) {
    return artists;
  } else if (searchType === "all") {
    return artists.filter((artist) => Object.values(artist).some((value) => value.toString().toLowerCase().includes(searchTerm)));
  } else {
    return artists.filter((artist) => artist[searchType].toString().toLowerCase().includes(searchTerm));
  }
}

export { selectSearch, searchList };

// function searchArtist(searchValue) {
//   const searchValues = searchValue.toLowerCase();
//   return artists.filter((artist) => artist.name.toLowerCase().includes(searchValues));
// }

// // Search for albums
// function searchAlbums(searchValue) {
//   const searchValues = searchValue.toLowerCase();
//   return albums.filter((album) => album.title.toLowerCase().includes(searchValues));
// }

// // Search for songs
// function searchSongs(searchValue) {
//   const searchValues = searchValue.toLowerCase();
//   return songs.filter((song) => song.title.toLowerCase().includes(searchValues));
// }

// Function to display search results
// function displayResults(results, containerElement) {
//   containerElement.innerHTML = "";
//   for (const result of results) {
//     const item = document.createElement("div");
//     item.textContent = result.name || result.title;
//     containerElement.appendChild(item);
//   }
// }

// Search input event listeners
// document.getElementById("input-search-artist").addEventListener("input", (event) => {
//     const searchValue = event.target.value;
//     const artistResults = searchArtists(searchValue);
//     displayResults(artistResults, document.getElementById("artists-container"));
// });

// document.getElementById("input-search-album").addEventListener("input", (event) => {
//     const searchValue = event.target.value;
//     const albumResults = searchAlbums(searchValue);
//     displayResults(albumResults, document.getElementById("albums-container"));
// });

// document.getElementById("input-search-song").addEventListener("input", (event) => {
//     const searchValue = event.target.value;
//     const songResults = searchSongs(searchValue);
//     displayResults(songResults, document.getElementById("songs-container"));
// });

// document.getElementById("search-form-artist").addEventListener("submit", (event) => {
//     event.preventDefault();
// });

// document.getElementById("search-form-album").addEventListener("submit", (event) => {
//     event.preventDefault();
// });

// document.getElementById("search-form-song").addEventListener("submit", (event) => {
//     event.preventDefault();
// });
