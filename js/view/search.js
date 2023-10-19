import { selectSearch } from './search.js';

// Define search variables and selected types for artists, albums, and songs
const search = {
    artist: { term: "", type: "all" },
    album: { term: "", type: "all" },
    song: { term: "", type: "all" },
};

// Function to handle search for any category
function selectSearch(category) {
    const enteredTerm = document.querySelector(`#${category}SearchField`).value.toLowerCase().trim();
    const selectedType = document.querySelector(`#${category}SearchType`).value;

    if (enteredTerm !== search[category].term || selectedType !== search[category].type) {
        setSearch(category, enteredTerm, selectedType);
        displayUpdatedList();
    }
}

// Function to set search variables for any category
function setSearch(category, term, type) {
    search[category].term = term;
    search[category].type = type;
}

// Function to search for items in any category
function searchItems(items, category) {
    const { term, type } = search[category];

    if (term.length === 0) {
        return items;
    } else if (type === "all") {
        return items.filter(item => Object.values(item).some(value => value.toString().toLowerCase().includes(term)));
    } else {
        return items.filter(item => item[type].toString().toLowerCase().includes(term));
    }
}

export { selectSearch, searchItems };
