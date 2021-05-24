export class Card {
  constructor({ name, link, likes, owner, _id }, cardsTemplate, handleCardClick, deletedPopup, deleteCard, removeIcon, userData, putLike, deleteLike, loadLike) {
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
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._loadLike = loadLike;
  }

  //Клонируем Темплейт
  _getTemplate() {
    const cardsElement = this._cardsTemplate.querySelector('.element').cloneNode('true');
    return cardsElement
  }

  /*   //Переключатель лайков
    _likeToggleCards() {
      this._cardsElement.querySelector('.element__button-heart').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__button-heart_active');
      })
    }; */


  _likeToggleCards = () => {
    this._cardsElement.querySelector('.element__button-heart').addEventListener('click', (evt) => {
      if (!evt.target.classList.contains('element__button-heart_active')) {
        this._putLike(this._idCard, this._cardsElement.querySelector('.element__like-number'))
        evt.target.classList.add('element__button-heart_active')

      } else {
        this._deleteLike(this._idCard, this._cardsElement.querySelector('.element__like-number'));
        evt.target.classList.remove('element__button-heart_active')
      }
    })
  };


  //Удаление карточки
  _removeCards = () => {
    this._cardsElement.remove();
  }

  //Слушатели для попапа удаления
  _setEventListeners() {
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
    this._buttonHeart = this._cardsElement.querySelector('.element__button-heart');


    this._removeIcon(this._id, this._userId, this._buttonRemove)
    this._likeToggleCards()
    this._setEventListeners();
    this._loadLike(this._likes, this._userId, this._buttonHeart, 'element__button-heart_active')

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._urlImage, this._nameImage)
    });
    return this._cardsElement
  }
}
