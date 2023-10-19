import ItemRenderer from "./itemrenderer.js";

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
      <button data-action="update" class="btn-update">Update⚙️</button>
      <button data-action="delete" class="btn-delete">Delete🗑️</button>       
      </div>
    </article>
  `;
    return html;
  }
}
