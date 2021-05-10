export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  rendererElements() {
    this._items.forEach((item) => {
      this._renderer(this._containerSelector, item.link, item.name)
    });
  };

  addItem(data) {
    this._renderer(this._containerSelector, data.urlImageElement, data.nameImageElement)
  }
}

