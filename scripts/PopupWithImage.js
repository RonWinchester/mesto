import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(url, text) {
    this._popupSelector.querySelector('.popup__figcaption').textContent = text;
    this._popupSelector.querySelector('.popup__image-figure').src = url;
    this._popupSelector.querySelector('.popup__image-figure').alt = text;
    super.open()
  };

}