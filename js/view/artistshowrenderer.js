import Dialog from "./dialog.js";

export default class ArtistShowDialog extends Dialog {
  constructor(artist, dialogId) {
    super(dialogId);
    this.artist = artist;
  }

  render() {
    const artist = this.artist; // You can declare 'artist' within this function
    const html = /*html*/ `
      <article class="grid-item" >
        <img src="${artist.image}"/>
        <h1>${artist.name}</h1>
        <div class="grid-info">
          <p>Birthdate: ${artist.birthdate}</p>
          <p>Genres: ${artist.genres}</p>
          <p>${artist.shortDescription}</p>
          <button data-action="close">Close</button>
        </div>
      </article>
    `;
    return html;
  }
}
