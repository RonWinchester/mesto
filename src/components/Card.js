export class Card {
  constructor({ name, link, likes, _id/* , owner */ }, cardsTemplate, handleCardClick, deletedPopup, cardDeleteClick, /*handleDeleteCard */) {
    this._nameImage = name;
    this._urlImage = link;
    this._likes = likes;
    this._id = _id;

    /*  this._owner = owner._id; */

    this._cardsTemplate = cardsTemplate;
    this._handleCardClick = handleCardClick;

    this._handleDeleteIconClick = deletedPopup;
    this._cardDeleteClick = cardDeleteClick;/*
    this._handleDeleteCard = handleDeleteCard; */
  }

  //Клонируем Темплейт
  _getTemplate() {
    const cardsElement = this._cardsTemplate.querySelector('.element').cloneNode('true');
    return cardsElement
  }

  //Переключатель лайков
  _likeToggleCards() {
    this._cardsElement.querySelector('.element__button-heart').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__button-heart_active');
    })
  };
  /*
    getID() {
      return this._id
    } */

  //Удаление карточки
  _removeCards() {
    this._cardsElement.remove();
  }

  //Слушатели для попапа удаления
  _setEventListeners() {
    this._buttonRemove.addEventListener('click', () => {
      this._handleDeleteIconClick();
      this._cardRemovePopup = document.querySelector('.popup_opened');
      this._cardRemoveButton = this._cardRemovePopup.querySelector('#CardRemoveForm');
      this._cardRemoveButton.addEventListener('submit', (event) => {
        event.preventDefault();
        this._removeCards();
        this._cardDeleteClick();
      })
    })
  }


  //Инициализация карточки
  getCardElement() {
    this._cardsElement = this._getTemplate();
    this._imageElement = this._cardsElement.querySelector('.element__image');
    this._imageElement.src = this._urlImage;
    this._imageElement.alt = this._nameImage;
    this._cardsElement.querySelector('.element__name').textContent = this._nameImage;
    this._cardsElement.querySelector('.element__like-number').textContent = this._likes.length;
    this._buttonRemove = this._cardsElement.querySelector('.element__button-remove');

    this._likeToggleCards()
    this._setEventListeners();

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._urlImage, this._nameImage)
    });

    return this._cardsElement
  }
}
