export class Card {
  constructor(nameImage, urlImage, cardsTemplate, handleCardClick) {
    this._nameImage = nameImage;
    this._urlImage = urlImage;
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

  //Инициализация карточки
  getCardElement() {
    this._cardsElement = this._getTemplate();
    this._imageElement = this._cardsElement.querySelector('.element__image');
    this._imageElement.src = this._urlImage;
    this._imageElement.alt = this._nameImage;
    this._cardsElement.querySelector('.element__name').textContent = this._nameImage;

    this._likeToggleCards(this._cardsElement);
    this._removeCards(this._cardsElement);

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._urlImage, this._nameImage)
    });

    return this._cardsElement
  }
}
