export default class albums {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.releaseDate = obj.releaseDate;
    this.artistIds = obj.artistIds;
    Object.defineProperty(this, "id", { writable: false });
  }
}
