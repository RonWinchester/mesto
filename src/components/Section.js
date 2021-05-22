export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

/*   rendererElements() {
    this._items.forEach(item => this._renderer(item));
  }; */

  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }

  addItem(element, isPrepend) {
    isPrepend ? this._containerSelector.prepend(element) : this._containerSelector.append(element);
  };
}

