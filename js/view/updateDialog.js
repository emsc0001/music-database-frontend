import Dialog from "./dialog.js";
import artists from "../model/artists.js";
import albums from "../model/albums.js";
import songs from "../model/songs.js";
import * as controller from "../frontend.js";

class ArtistUpdateDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<h1>Update Artist</h1>
      <form action="" method="dialog" id="update-form">
        <label for="update-artist-name">Artist Name:</label> <input type="text" id="update-artist-name" name="name" placeholder="The artist name - e.g. 50 cent">
        <label for="update-artist-birthdate">Birthdate:</label> <input type="date" id="update-artist-birthdate" name="birthdate">
        <label for="update-artist-genres">Genres:</label> <input type="text" id="update-artist-genres" name="genres" placeholder="pop, rap, soul, grime......">
        <label for="update-artist-description">Description:</label> <input type="text" id="update-artist-description" name="shortDescription">
        <label for="update-artist-images">Image:</label> <input type="text" id="update-artist-images" name="images">
        <button  data-action="update">Update</button>
        <button data-action="close">Close</button>

      </form>`;

    return html;
  }
  setArtist(artist) {
    this.artist = artist;
    const form = this.dialog.querySelector("form");
    form.name.value = artist.name;
    if (artist.birthdate) {
      const birthdate = new Date(artist.birthdate);
      if (!isNaN(birthdate)) {
        const formattedBirthdate = birthdate.toISOString().split("T")[0];
        form.birthdate.value = formattedBirthdate;
      }
    } else {
      form.birthdate.value = ""; // Tøm feltet, hvis fødselsdatoen er null
    }

    form.genres.value = artist.genres;
    form.shortDescription.value = artist.shortDescription;
    form.images.value = artist.images;
  }

  update() {
    const form = this.dialog.querySelector("form");

    if (!form.name.value) {
      alert("Artist Name is required.");
      return;
    }

    this.artist.name = form.name.value;
    const birthdateInput = form.birthdate.value;
    if (birthdateInput) {
      const birthdate = new Date(birthdateInput);
      if (!isNaN(birthdate)) {
        // Hvis datoen er gyldig, konverter den til det ønskede format
        const formattedBirthdate = birthdate.toISOString().split("T")[0];
        this.artist.birthdate = formattedBirthdate;
      } else {
        alert("Invalid date format. Please use 'yyyy-MM-dd'.");
        return;
      }
    } else {
      // Hvis inputtet er tomt, fjern fødselsdatoen
      this.artist.birthdate = null;
    }
    this.artist.genres = form.genres.value;
    this.artist.shortDescription = form.shortDescription.value;
    this.artist.images = form.images.value;

    console.log("Update artist", this.artist);

    controller.updateArtist(this.artist);
  }
}

class AlbumUpdateDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/
      `<h1>Update album</h1>
        <form action="" method="dialog" id="update-form">
        <label for="update-album-title">Album title:</label> <input type="text" id="update-album-title" name="title" placeholder="The album title - e.g. Get rich or die tyin'">
        <label for="update-album-release-date">Release date:</label> <input type="date" id="update-album-release-date" name="releaseDate" >
        <button data-action="update">Update</button>
        <button data-action="close">Close</button>

      </form>`;

    return html;
  }

  setAlbum(album) {
    this.album = album;
    const form = this.dialog.querySelector("form");
    form.title.value = album.title;
    if (album.releaseDate) {
      const releaseDate = new Date(album.releaseDate);
      if (!isNaN(releaseDate)) {
        const formattedreleaseDate = releaseDate.toISOString().split("T")[0];
        form.releaseDate.value = formattedreleaseDate;
      }
    } else {
      form.releaseDate.value = ""; // Tøm feltet, hvis fødselsdatoen er null
    }
  }

  update() {
    const form = this.dialog.querySelector("form");

    this.album.title = form.title.value;
    this.album.releaseDate = form.releaseDate.value;
    const releaseDateInput = form.releaseDate.value;
    if (releaseDateInput) {
      const releaseDate = new Date(releaseDateInput);
      if (!isNaN(releaseDate)) {
        // Hvis datoen er gyldig, konverter den til det ønskede format
        const formattedreleaseDate = releaseDate.toISOString().split("T")[0];
        this.album.releaseDate = formattedreleaseDate;
      } else {
        alert("Invalid date format. Please use 'yyyy-MM-dd'.");
        return;
      }
    } else {
      // Hvis inputtet er tomt, fjern fødselsdatoen
      this.album.releaseDate = null;
    }
    console.log("Update album", this.album);

    controller.updateAlbum(this.album);
  }
}

class SongUpdateDialog extends Dialog {
  renderHTML() {
    const html =
      /*HTML*/

      `<div class="dialog">

      <h1>Update song</h1>
        <form action="" method="dialog" id="update-form">
        <label for="update-song-title">Song title:</label> <input type="text" id="update-song-title" name="title" placeholder="The song title - e.g. in da club">
        <label for="update-song-release-date">Release Date:</label> <input type="date" id="update-song-release-date" name="releaseDate" >
        <label for="update-song-length">Length (MM:SS):</label><input type="text" id="update-song-length" name="length" placeholder="03:22" />
        <button data-action="update">Update</button>
       <button data-action="close">Close</button>
      </form>
      </div>`;

    return html;
  }

  setSong(song) {
    this.song = song;
    const form = this.dialog.querySelector("form");
    form.title.value = song.title;
    if (song.releaseDate) {
      const releaseDate = new Date(song.releaseDate);
      if (!isNaN(releaseDate)) {
        const formattedreleaseDate = releaseDate.toISOString().split("T")[0];
        form.releaseDate.value = formattedreleaseDate;
      }
    } else {
      form.releaseDate.value = ""; // Tøm feltet, hvis fødselsdatoen er null
    }
    form.length.value = song.length;
  }

  update() {
    const form = this.dialog.querySelector("form");

    this.song.title = form.title.value;
    const releaseDateInput = form.releaseDate.value;
    if (releaseDateInput) {
      const releaseDate = new Date(releaseDateInput);
      if (!isNaN(releaseDate)) {
        // Hvis datoen er gyldig, konverter den til det ønskede format
        const formattedreleaseDate = releaseDate.toISOString().split("T")[0];
        this.song.releaseDate = formattedreleaseDate;
      } else {
        alert("Invalid date format. Please use 'yyyy-MM-dd'.");
        return;
      }
    } else {
      // Hvis inputtet er tomt, fjern fødselsdatoen
      this.song.releaseDate = null;
    }
    this.song.length = form.length.value;

    console.log("Update song", this.song);

    controller.updateSong(this.song);
  }
}

export { SongUpdateDialog, ArtistUpdateDialog, AlbumUpdateDialog };
