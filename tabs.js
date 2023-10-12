let selectedTab = null;

function initTabs() {
  // Setup tab-toggling
  document.querySelectorAll("#tabs h2").forEach((tab) => tab.addEventListener("click", selectTab));
  // Click the first tab to enable everything
  document.querySelector("#tabs h2").click();
}

function selectTab(event) {
  const tab = event.target;
  // Only accept click if the tab isn't selected
  if (!tab.classList.contains("selected")) {
    // Unselect the last tab - if any
    if (selectedTab) {
      selectedTab.classList.remove("selected");
      document.querySelector(`#${selectedTab.dataset.tabShow}`).classList.add("hide");
    }
    // Select this tab
    tab.classList.add("selected");
    document.querySelector(`#${tab.dataset.tabShow}`).classList.remove("hide");

    // Remember the selected tab
    selectedTab = tab;
  }
}

export { initTabs };
