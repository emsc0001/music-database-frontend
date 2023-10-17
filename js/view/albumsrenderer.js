import ItemRenderer from "./itemrenderer.js";

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
      <button class="btn-update">Update⚙️</button>
      <button class="btn-delete">Delete🗑️</button>      
      </div>
    </article>
  `;
    return html;
  }
}
