export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  rendererElements() {
    this._items.forEach(item => {
      item.this._renderer()
    });
  };

  addItem() {

  }
}
/*
//Создание карточки
function createCard(itemName, itemLink, cardsTemplate) {
  const card = new Card(itemName, itemLink, cardsTemplate,  //cardImageClickHandler );
  return card.getCardElement();
}

//Добавление карточки в контейнер
function renderCard(container, itemLink, itemName) {
  container.prepend(createCard(itemName, itemLink, cardsTemplate));
};

//Загрузка первых карточек
initialCards.forEach(function (item) {
  renderCard(elementList, item.link, item.name)
}) */
