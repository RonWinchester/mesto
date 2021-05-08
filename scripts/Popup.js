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

  //Слушатель клика иконке закрытия
  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => {
      this.close()
    });
  }

  //Закрытие попапа на оверлей и крестик
  setCloseByOverlayClickListener() {
    this._popupSelector.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }

}