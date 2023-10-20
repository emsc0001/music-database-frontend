import ItemRenderer from "./itemrenderer.js";
import * as controller from "../frontend.js";

export default class ArtistRenderer extends ItemRenderer {
  render() {
    const artist = this.item;
    const html = /*html*/ `
            <article class="grid-item">
                <img src= "${artist.images}"/>
                <div class="grid-info">
                <h2>${artist.name}</h2>
                <h3>${artist.genres}</h3>
            </div>
            <div class="btns">
                <button type="button" data-action="updateArtist">Update⚙️</button>
                <button type="button" data-action="deleteArtist">Delete🗑️</button>    
             </div>
    </article>
  `;
    return html;
  }
  postRender(element) {
    // Add eventListener to element
    element.addEventListener("click", (event) => {
      const action = event.target.dataset.action ?? "update";
      const artist = this.item;

      if (action === "updateArtist") {
        // Tjek om action er "updateArtist"
        // Handle action - as defined in data-action="..."
        controller.selectArtistForUpdate(artist);
      } else if (action === "delete") {
        controller.confirmDeleteArtist(artist);
      }
    });
  }
}
