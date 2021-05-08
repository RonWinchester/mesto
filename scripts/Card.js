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
    const cardsElement = this._getTemplate();
    const imageElement = cardsElement.querySelector('.element__image');
    imageElement.src = this._urlImage;
    imageElement.alt = this._nameImage;
    cardsElement.querySelector('.element__name').textContent = this._nameImage;

    this._likeToggleCards(cardsElement);
    this._removeCards(cardsElement);

    imageElement.addEventListener('click', () => {
      this._handleCardClick(this._urlImage, this._nameImage)
    });

    return cardsElement
  }
}
