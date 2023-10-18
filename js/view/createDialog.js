import Dialog from "./dialog.js";
import artists from "../model/artists.js";
import albums from "../model/albums.js";
import songs from "../model/songs.js";
import * as controller from "../frontend.js"

class ArtistCreateDialog extends Dialog {
    
    renderHTML() {
        const html = /*HTML*/
        `<h1>Create Artist</h1>
        <form action="" method="dialog" id="create-form">
        <label for="create-artist-name">Artist Name:</label> <input type="text" id="create-artist-name" name="name" placeholder="The artist name - e.g. 50 cent">
        <label for="create-artist-birthdate">Birthdate:</label> <input type="date" id="create-artist-birthdate" name="birthdate" >
        <label for="create-artist-genres">Genres:</label> <input type="text" id="create-artist-genres" name="genres" placeholder="pop, rap, soul, grime......">
        <label for="create-artist-description">Description:</label> <input type="text" id="create-artist-description" name="description">
        <label for="create-artist-image">Image:</label> <input type="text" id="create-artist-image" name="image">
        <button data-action="create">Create</button>
      </form>`;

            return html;
    }

    // -------MANGLER EVT ID???--------- //
    create() {
        // Build artist-object from form 
        const form = this.dialog.querySelector("form");
        this.artist = new artists({
            name: form.name.value,
            birthdate: form.birthdate.value,
            genres: form.genres.value,
            description: form.description.value,
            image: form.image.value,
        });

        // clear form
        form.reset();

        controller.createArtist(this.artist);
    }

}

// -----SKAL HAVE GJORT SÅ KUNSTNER MED PÅ------ //
  class AlbumCreateDialog extends Dialog {
    
    renderHTML() {
        const html =
            /*HTML*/
            `<h1>Create Album</h1>
        <form action="" method="dialog" id="create-form">
        <label for="create-album-title">Album title:</label> <input type="text" id="create-album-title" name="title" placeholder="The album title - e.g. Get rich or die tyin'">
        <label for="create-album-release-date">Release date:</label> <input type="date" id="create-album-release-date" name="releaseDate" >
        <button data-action="create">Create</button>
      </form>`;

            return html;
    }

    // -------MANGLER EVT ID???--------- //
    create() {
        // Build artist-object from form 
        const form = this.dialog.querySelector("form");
        this.album = new albums({
            title: form.title.value,
            releaseDate: form.releaseDate.value,
        });

        // clear form
        form.reset();

        controller.createAlbum(this.album);
    }

}
// -----SKAL HAVE GJORT SÅ KUNSTNER og ALBUM KOMMER MED PÅ------ //
  class SongCreateDialog extends Dialog {
    
    renderHTML() {
        const html =
            /*HTML*/
            `<h1>Create Song</h1>
        <form action="" method="dialog" id="create-form">
        <label for="create-song-title">Song title:</label> <input type="text" id="create-song-title" name="title" placeholder="The song title - e.g. in da club">
        <label for="create-song-release-date">Release Date:</label> <input type="date" id="create-song-release-date" name="releaseDate" >
        <label for="create-song-length">Length (MM:SS):</label><input type="text" id="create-song-length" name="length" placeholder="03:22" />
        <button data-action="create">Create</button>
      </form>`;

            return html;
    }

    // -------MANGLER EVT ID???--------- //
    create() {
        // Build artist-object from form 
        const form = this.dialog.querySelector("form");
            this.song = new songs({
            title: form.title.value,
            releaseDate: form.releaseDate.value,
            length: form.length.value,
        });

        // clear form
        form.reset();

        controller.createSong(this.song);
    }

}


export default {ArtistCreateDialog, AlbumCreateDialog, SongCreateDialog}