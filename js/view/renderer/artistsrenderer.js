import ItemRenderer from "./itemrenderer.js";
import * as controller from "../../main.js";

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
                <button type="button" data-action="updateArtist">Update⚙️</button>
                <button type="button" data-action="deleteArtist">Delete🗑️</button>    
             </div>
    </article>
  `;
        return html;
    }
    postRender(element) {
        // Add eventListener to element
        element.addEventListener("click", async (event) => {
            const action = event.target.dataset.action ?? "update";
            const artist = this.item;

            if (action === "updateArtist") {
                controller.selectArtistForUpdate(artist);
            } else if (action === "deleteArtist") {
                controller.confirmDeleteArtist(artist);
            } else if (action === "changeName") {
                // Simpel prompt for at hente det nye kunstnernavn fra brugeren
                const newName = prompt("Indtast det nye kunstnernavn:");
                if (newName) {
                    // Opdater kunstnerens navn
                    artist.name = newName;
                    // Kald metoden for at gemme ændringen i databasen
                    await controller.updateSingleArtistProperty(artist, "name", newName);
                    // Opdater visningen for kunstneren med det nye navn
                    this.rerender(element);
                }
            }
        });
    }
}
