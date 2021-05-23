export class Card {
  constructor({ name, link, likes, owner, _id}, cardsTemplate, handleCardClick, deletedPopup, deleteCard, removeIcon, userData) {
    this._nameImage = name;
    this._urlImage = link;
    this._likes = likes;
    this._id = owner._id;
    this._userId = userData._id
    this._idCard = _id;


    this._cardsTemplate = cardsTemplate;
    this._handleCardClick = handleCardClick;

    this._handleDeleteIconClick = deletedPopup;
    this._deleteCard = deleteCard;
    this._removeIcon = removeIcon;
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

  //Удаление карточки
  _removeCards = () => {
     this._cardsElement.remove();
  }

  //Слушатели для попапа удаления
  _setEventListeners()  {
    this._buttonRemove.addEventListener('click', () => {
      this._handleDeleteIconClick();
      this._cardRemovePopup = document.querySelector('.popup_opened');
      this._cardRemoveButton = this._cardRemovePopup.querySelector('#CardRemoveForm');
      this._deleteCard(this._cardRemoveButton, this._removeCards, this._idCard);
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

    this._removeIcon(this._id, this._userId, this._buttonRemove)
    this._likeToggleCards()
    this._setEventListeners();

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._urlImage, this._nameImage)
    });

    return this._cardsElement
  }
}
