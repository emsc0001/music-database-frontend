import ItemRenderer from "./itemrenderer.js";
import * as controller from "../../frontend.js";

export default class AlbumRenderer extends ItemRenderer {
    render() {
        const albums = this.item;
        const html = /*html*/ `
           <article class="grid-item">
      <h1>${albums.title}</h1>
      <div class="grid-info">
        <h2>${albums.releaseDate}</h2>
      </div>
      <div class="btns">
      <button class="btn-update" data-action="updateAlbum">Update⚙️</button>
      <button class="btn-delete" data-action="deleteAlbum">Delete🗑️</button>      
      </div>
    </article>
  `;
        return html;
    }

    postRender(element) {
        // Add eventListener to element
        element.addEventListener("click", (event) => {
            const action = event.target.dataset.action ?? "update";
            const album = this.item;

            if (action === "updateAlbum") {
                // Tjek om action er "updateArtist"
                // Handle action - as defined in data-action="..."
                controller.selectAlbumForUpdate(album);
            } else if (action === "deleteAlbum") {
                controller.confirmDeleteAlbum(album);
            }
        });
    }
    
}
