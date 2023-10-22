import { updatedListArtist } from "../frontend.js";
import { endpoint } from "../rest-service.js";


async function handleSearch() {
    // Get the search query from the input field
    const searchQuery = document.getElementById("input-search-artist").value;

    // Send a request to the backend if the query is not empty
    if (searchQuery) {

        const response = await fetch(`${endpoint}/search?q=${searchQuery}`);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            updatedListArtist(data);
        } else {
            console.error("Search request failed");
        }
    }
}





export { handleSearch};


