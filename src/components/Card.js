export class Card {
  constructor({ name, link, likes }, cardsTemplate, handleCardClick) {
    this._nameImage = name;
    this._urlImage = link;
    this._likes = likes,
      this._cardsTemplate = cardsTemplate;
    this._handleCardClick = handleCardClick;
  }

  //Клонируем Темплейт
  _getTemplate() {
    const cardsElement = this._cardsTemplate.querySelector('.element').cloneNode('true');
    return cardsElement
  }

  //Переключатель лайков
  _likeToggleCards(element) {
    element.querySelector('.element__button-heart').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__button-heart_active');
    })
  };


  //Удаление карточки
  _removeCards(element) {
    const buttonRemove = element.querySelector('.element__button-remove');
    buttonRemove.addEventListener('click', () => {
      element.remove();
    })
  }

  //Удаление карточки
  /*   _removeCards(element) {
      const buttonRemove = document.querySelector('#cardRemoveButton');
      buttonRemove.addEventListener('click', () => {
        element.remove();
      }) */

  //Инициализация карточки
  getCardElement(/* openPopup */) {
    this._cardsElement = this._getTemplate();
    this._imageElement = this._cardsElement.querySelector('.element__image');
    this._imageElement.src = this._urlImage;
    this._imageElement.alt = this._nameImage;
    this._cardsElement.querySelector('.element__name').textContent = this._nameImage;
    this._cardsElement.querySelector('.element__like-number').textContent = this._likes.length;
    const buttonRemove = this._cardsElement.querySelector('.element__button-remove');

    /* buttonRemove.addEventListener('click', () => {
      openPopup()
    }); */

    this._likeToggleCards(this._cardsElement);
    this._removeCards(this._cardsElement);

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._urlImage, this._nameImage)
    });

    return this._cardsElement
  }
}
