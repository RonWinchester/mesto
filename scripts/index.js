const popupEditForm = document.querySelector('#profileEditForm');
const elementAddForm = document.querySelector('#elementAddForm');
const imagePopup = document.querySelector('#imagePopup');

const profileButton = document.querySelector('.profile-info__button');
const addElementButton = document.querySelector('.profile__add-button');

const formProfile = document.querySelector('#profileForm');
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const profileInfoName = document.querySelector('.profile-info__name');
const profileInfoJob = document.querySelector('.profile-info__job');

const elementList = document.querySelector('.elements__list');

const cardsTemplate = document.querySelector('#cardsElement').content;

const imageAddForm = document.querySelector('#ImageAddForm');
const nameImage = document.querySelector('#nameImage');
const urlImage = document.querySelector('#urlImage');

//Кнопки закрытия попапов
const popupEditCloseButton = popupEditForm.querySelector('.popup__close-button');
const popupAddCloseButton = elementAddForm.querySelector('.popup__close-button');
const popupCloseButtonImage = imagePopup.querySelector('.popup__close-button');

const imagePopupPicture = imagePopup.querySelector('.popup__image-figure');
const imagePopupFigcaption = imagePopup.querySelector('.popup__figcaption');


// Закрытие попапа на Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};


//Скрыть сообщение об ошибке
function hideError(popup, { formSelector, inputSelector, inputErrorClass, errorClass }) {
  const formElement = popup.querySelector(formSelector);
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
  inputElements.forEach(inputElement => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
  })
}

//Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

// Отправка формы редактирования профиля
function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileInfoName.textContent = nameInput.value;
  profileInfoJob.textContent = jobInput.value;
  closePopup(popupEditForm);
}

//Подтягиваем лайки
function likeToggleCards(element) {
  element.querySelector('.element__button-heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-heart_active');
  })
};

//Удаление карточки
function removeCards(element) {
  const buttonRemove = element.querySelector('.element__button-remove');
  buttonRemove.addEventListener('click', () => {
    element.remove();
  })
}

//Закрытие попапа на оверлей
function setCloseByOverlayClickListener(popupElement) {
  popupElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
      closePopup(popupElement)
    }
  });
}

// Открытие попапа карточки
function openImagePopup(item) {
  imagePopupPicture.src = item.src;
  imagePopupPicture.alt = item.textContent;
  imagePopupFigcaption.textContent = item.alt;
  openPopup(imagePopup);
}

// Инициализация карточки
function getCardElement(itemLink, itemName) {
  const cardsElement = cardsTemplate.querySelector('.element').cloneNode('true');
  const imageElement = cardsElement.querySelector('.element__image');
  imageElement.src = itemLink;
  imageElement.alt = itemName;
  cardsElement.querySelector('.element__name').textContent = itemName;

  likeToggleCards(cardsElement);
  removeCards(cardsElement);

  imageElement.addEventListener('click', () => {
    openImagePopup(imageElement);
  });

  return cardsElement
}

//Добавление карточки в контейнер
function renderCard(container, itemLink, itemName) {
  container.prepend(getCardElement(itemLink, itemName));
};

//Загрузка первых карточек
initialCards.forEach(function (item) {
  renderCard(elementList, item.link, item.name)
})


//Добавление новых карточек из формы
function addCardElement(evt) {
  evt.preventDefault()
  renderCard(elementList, urlImage.value, nameImage.value)
  closePopup(elementAddForm)
  imageAddForm.reset()
};


profileButton.addEventListener('click', () => {
  openPopup(popupEditForm)
  nameInput.value = profileInfoName.textContent;
  jobInput.value = profileInfoJob.textContent;
  hideError(popupEditForm, validationConfig)
});


addElementButton.addEventListener('click', () => {
  openPopup(elementAddForm);
  imageAddForm.reset();
  hideError(elementAddForm, validationConfig)
});

popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEditForm);
});

popupAddCloseButton.addEventListener('click', () => {
  closePopup(elementAddForm)
});

popupCloseButtonImage.addEventListener('click', () => {
  closePopup(imagePopup);
})

formProfile.addEventListener('submit', formEditProfileSubmitHandler);

imageAddForm.addEventListener('submit', addCardElement);

setCloseByOverlayClickListener(imagePopup);
setCloseByOverlayClickListener(elementAddForm);
setCloseByOverlayClickListener(popupEditForm);


//////////////
class Card {
  constructor(nameImage, urlImage, cardsTemplate) {
    this._nameImage = "Байкал";
    this._urlImage = "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
    this._cardsTemplate = cardsTemplate;
  }

  _getTemplate() {
    const cardsElement = this._cardsTemplate.querySelector('.element').cloneNode('true');
    return cardsElement
  }

  _getCardElement() {
    const cardsElement = this._getTemplate();
    const imageElement = cardsElement.querySelector('.element__image');
    imageElement.src = this._urlImage;
    imageElement.alt = this._nameImage;
    cardsElement.querySelector('.element__name').textContent = this._nameImage;
    return cardsElement
  }
}
const card = new Card(nameImage, urlImage, cardsTemplate);
elementList.prepend(card._getCardElement());
console.log(card)

/* function getCardElement(itemLink, itemName) {
  const cardsElement = cardsTemplate.querySelector('.element').cloneNode('true');
  const imageElement = cardsElement.querySelector('.element__image');
  imageElement.src = itemLink;
  imageElement.alt = itemName;
  cardsElement.querySelector('.element__name').textContent = itemName;

  likeToggleCards(cardsElement);
  removeCards(cardsElement);

  imageElement.addEventListener('click', () => {
    openImagePopup(imageElement);
  });

  return cardsElement
} */