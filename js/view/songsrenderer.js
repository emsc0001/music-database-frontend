import ItemRenderer from "./itemrenderer.js";
import * as controller from "../frontend.js";

export default class SongRenderer extends ItemRenderer {
  render() {
    const songs = this.item;
    const html = /*html*/ `
       <article class="grid-item">
    <h1>${songs.title}</h1>
    <div class="grid-info">
    <h2>${songs.releaseDate}</h2>
     <h3>${songs.length}</h3>
      </div>
      <div class="btns">
      <button class="btn-update" data-action="updateSong">Update⚙️</button>
      <button class="btn-delete">Delete🗑️</button>       
      </div>
    </article>
  `;
    return html;
  }
  postRender(element) {
    // Add eventListener to element
    element.addEventListener("click", (event) => {
      const action = event.target.dataset.action ?? "update";
      const song = this.item;

      if (action === "updateSong") {
        // Tjek om action er "updateArtist"
        // Handle action - as defined in data-action="..."
        controller.selectSongForUpdate(song);
      } else if (action === "delete") {
        controller.confirmDeleteArtist(song);
      }
    });
  }
}
