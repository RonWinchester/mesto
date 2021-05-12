import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._caption = this._popup.querySelector('.popup__figcaption');
    this._image = this._popup.querySelector('.popup__image-figure');
  }

  open = (url, text) => {
    this._caption.textContent = text;
    this._image.src = url;
    this._image.alt = text;
    super.open()
  };

}