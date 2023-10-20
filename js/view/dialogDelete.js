import Dialog from "./dialog.js";
import artists from "../model/artists.js";
import albums from "../model/albums.js";
import songs from "../model/songs.js";
import * as controller from "../frontend.js";

class ArtistDeleteDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<div class="dialog2">
      <h1>Delete Artist?</h1>
      <p>Are you sure you want to delete the Artist "${this.artist.name}"?</p>
      <form action="" method="dialog" id="delete-form">
        <button type="button" data-action="close">Close</button>
        <button type="button" data-action="delete">Delete</button>
      </form>
    </div>`;

    return html;
  }

  setArtist(artist) {
    this.artist = artist;
  }

  delete() {
    if (this.artist) {
      controller.deleteArtist(this.artist);
    }
  }
}
class AlbumDeleteDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<h1>Delete Album?</h1>
      <p>Are you sure you want to delete the Album "${this.album.title}"?</p>
      <form action="" method="dialog" id="delete-form">
        <button type="button" data-action="cancelConfirm2">Cancel</button>
        <button type="submit" data-action="deleteConfirm2">Delete</button>
      </form>`;

    return html;
  }

  setArtist(album) {
    this.album = album;
  }

  delete() {
    controller.deleteAlbum(this.album);
  }
}
class SongDeleteDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<h1>Delete Song?</h1>
      <p>Are you sure you want to delete the Album "${this.song.title}"?</p>
      <form action="" method="dialog" id="delete-form">
        <button type="button" data-action="cancelConfirm3">Cancel</button>
        <button type="submit" data-action="deleteConfirm3">Delete</button>
      </form>`;

    return html;
  }

  setArtist(song) {
    this.song = song;
  }

  delete() {
    controller.deleteSong(this.song);
  }
}

export { ArtistDeleteDialog, AlbumDeleteDialog, SongDeleteDialog };
