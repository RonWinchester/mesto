export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  rendererElements() {
    this._items.forEach(item => this._renderer(item));
  };

/*   renderItems(items) { //метод, принмающий карточки как параметр
    items.forEach(item => this._renderer(item));
  } */

  addItem(element) {
    this._containerSelector.prepend(element);
  };
}

