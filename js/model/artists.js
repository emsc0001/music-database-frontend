export default class artists {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.birthdate = obj.birthdate;
    this.genres = obj.genres;
    this.shortDescription = obj.shortDescription;
    this.images = obj.images;
    Object.defineProperty(this, "id", { writable: false });
  }
}
