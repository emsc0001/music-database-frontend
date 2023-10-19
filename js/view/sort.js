

import { selectSort, sortList } from './sort.js';

let sortingBy = "name";
let sortingDirection = "asc";

function selectSort(event, category) {
    const heading = event.target;

    const sortBy = heading.dataset.sortBy;
    const sortDir = heading.dataset.sortDirection;

    // Show status in UI
    // Find the "old" selected element and remove the "selected" class
    const oldHeading = document.querySelector(`[data-action=sort][data-category=${category}].selected`);
    oldHeading?.classList.remove("selected");

    // Indicate active sort
    heading.classList.add("selected");

    // Toggle direction in UI
    if (sortDir === "asc") {
        heading.dataset.sortDirection = "desc";
    } else {
        heading.dataset.sortDirection = "asc";
    }

    setSort(category, sortBy, sortDir);

    displayUpdatedList();
}

function setSort(category, sortBy, sortDir) {
    sortingBy = sortBy;
    sortingDirection = sortDir;
    // You may want to store the sorting settings separately for each category.
}

function sortList(items) {
    const order = sortingDirection === "asc" ? 1 : -1;
    return items.sort((a, b) => (a[sortingBy] === b[sortingBy] ? 0 : a[sortingBy] > b[sortingBy] ? order : -order));
}

document.getElementById('sort-artist').addEventListener('change', sortArtists);
document.getElementById('filter-artist').addEventListener('change', filterArtists);

document.getElementById('search-form-artist').addEventListener('submit', function (e) {
  e.preventDefault();
  searchAndFilter('artist');
});


export { selectSort, sortList };
