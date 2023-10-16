export default class albums {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.releaseDate = obj.releaseDate;
    Object.defineProperty(this, "id", { writable: false });
  }
}
