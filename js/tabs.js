export function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-buttons button");
  const tabContents = document.querySelectorAll(".tab-content");

  // Hide the artist search field on page load
  document.getElementById("search-form-artist").style.display = "none";
  document.getElementById("search-form-album").style.display = "none";
  document.getElementById("search-form-song").style.display = "none";

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tabShow");

      // Hide all content
      tabContents.forEach((content) => {
        content.style.display = "none";
      });

      // Show the relevant content
      document.getElementById(tabName).style.display = "block";

      // Handle the visibility of search fields based on the tab
      document.getElementById("search-form-artist").style.display = "none";
      document.getElementById("search-form-album").style.display = "none";
      document.getElementById("search-form-song").style.display = "none";

      if (tabName === "artists") {
        document.getElementById("search-form-artist").style.display = "block";
      } else if (tabName === "albums") {
        document.getElementById("search-form-album").style.display = "block";
      } else if (tabName === "songs") {
        document.getElementById("search-form-song").style.display = "block";
      }
    });
  });

  // Hide all tabs on page load except for "Artists"
  tabContents.forEach((content) => {
    content.style.display = "none";
  });
  document.getElementById("artists").style.display = "block";
}
