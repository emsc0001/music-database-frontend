export default class songs {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.releaseDate = obj.releaseDate;
    this.length = obj.length;
    this.artistIds = obj.artistIds;
    this.albumIds = obj.albumIds
    Object.defineProperty(this, "id", { writable: false });
  }
}
