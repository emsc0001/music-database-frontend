import ItemRenderer from "./itemrenderer.js";

export default class albumRenderer extends ItemRenderer {
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
        <button class="btn-update">Update</button>
        <button class="btn-delete">Delete</button>    
      </div>
    </article>
  `;
    return html;
  }
}
