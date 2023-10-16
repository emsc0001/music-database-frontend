import ItemRenderer from "./itemrenderer.js";

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
                <button class="btn-update">Update</button>
                <button class="btn-delete">Delete</button>    
             </div>
    </article>
  `;
        return html;
    }

}
