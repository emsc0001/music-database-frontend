import { artists, albums, songs } from "./frontend.js";


// Search for artists
function searchArtists(searchValue) {
  const searchValues = searchValue.toLowerCase();
  return artists.filter((artist) => artist.name.toLowerCase().includes(searchValues));
}

// Search for albums
function searchAlbums(searchValue) {
  const searchValues = searchValue.toLowerCase();
  return albums.filter((album) => album.title.toLowerCase().includes(searchValues));
}

// Search for songs
function searchSongs(searchValue) {
  const searchValues = searchValue.toLowerCase();
  return songs.filter((song) => song.title.toLowerCase().includes(searchValues));
}

// Function to display search results
function displayResults(results, containerElement) {
  containerElement.innerHTML = "";
  for (const result of results) {
    const item = document.createElement("div");
    item.textContent = result.name || result.title; 
    containerElement.appendChild(item);
  }
}
_

// Search input event listeners
document.getElementById("input-search-artist").addEventListener("input", (event) => {
    const searchValue = event.target.value;
    const artistResults = searchArtists(searchValue);
    displayResults(artistResults, document.getElementById("artists-container"));
});

document.getElementById("input-search-album").addEventListener("input", (event) => {
    const searchValue = event.target.value;
    const albumResults = searchAlbums(searchValue);
    displayResults(albumResults, document.getElementById("albums-container"));
});
  
document.getElementById("input-search-song").addEventListener("input", (event) => {
    const searchValue = event.target.value;
    const songResults = searchSongs(searchValue);
    displayResults(songResults, document.getElementById("songs-container"));
});

document.getElementById("search-form-artist").addEventListener("submit", (event) => {
    event.preventDefault();
});

document.getElementById("search-form-album").addEventListener("submit", (event) => {
    event.preventDefault();
});

document.getElementById("search-form-song").addEventListener("submit", (event) => {
    event.preventDefault();
});
