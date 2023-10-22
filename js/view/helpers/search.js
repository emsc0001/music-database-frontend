// import { updatedListArtist } from "../../frontend.js";
import { updatedList } from "../../frontend.js";
import { endpoint } from "../../rest-service.js";
import ArtistRenderer from "../renderer/artistsrenderer.js";
import AlbumRenderer from "../renderer/albumsrenderer.js";
import SongRenderer from "../renderer/songsrenderer.js";

async function handleSearch(event) {
    // Get the search query from the input field
    const searchInput = event.target;
    const searchQuery = searchInput.value;
    console.log(searchQuery);

    // Get the search type from the data attribute
    const searchType = searchInput.getAttribute("data-search-type");

    // Send a request to the backend if the query is not empty
    if (searchQuery) {
        const response = await fetch(`${endpoint}/search?q=${searchQuery}`);

        if (response.ok) {
            const data = await response.json();
            // Handle the search results based on the search type
            if (searchType === "artists") {
                updatedList(data.artists, "#artists-container", ArtistRenderer);
            } else if (searchType === "albums") {
                updatedList(data.albums, "#albums-container", AlbumRenderer);
            } else if (searchType === "songs") {
                updatedList(data.songs, "#songs-container", SongRenderer);
            }
        } else {
            console.error("Search request failed");
        }
    }
}

export { handleSearch };
