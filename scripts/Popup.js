export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector)
  };

  // Открытие попапа
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  //Закрытие попапа
  close = () => {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  // Закрытие попапа на Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }


  //Закрытие попапа на оверлей и крестик
  setEventListeners() {
    this._popupSelector.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }

}