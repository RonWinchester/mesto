import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import {
  validationConfig,
  profileButton,
  addElementButton,
  popupEditForm,
  elementAddForm,
  imagePopup,
  formProfile,
  nameInput,
  jobInput,
  profileInfoName,
  profileInfoJob,
  elementList,
  cardsTemplate,
  imageAddForm,
  nameImage,
  urlImage,
  initialCards,
} from './constants.js';

import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const popupWithImage = new PopupWithImage('#imagePopup');
const editProfilePopup = new PopupWithForm('#profileEditForm', formEditProfileSubmitHandler);
const addCardPopup = new PopupWithForm('#elementAddForm', addCardElement);
const userInfoProfile = new UserInfo({ name: '.profile-info__name', job: '.profile-info__job' });
const initialСards = new Section({ items: initialCards, renderer: renderCard }, elementList);
const addedCards = new Section({ items: {}, renderer: renderCard }, elementList);

//Загрузка первых карточек
initialСards.rendererElements()

// Отправка формы редактирования профиля
function formEditProfileSubmitHandler(data) {
  userInfoProfile.setUserInfo(data)
  editProfilePopup.close()
}

//Открытие попапа карточки
function handleCardClick(url, text) {
  popupWithImage.open(url, text)
}

//Создание карточки
function createCard(itemName, itemLink, cardsTemplate) {
  const card = new Card(itemName, itemLink, cardsTemplate, handleCardClick);
  return card.getCardElement();
}

//Добавление карточки в контейнер
function renderCard(container, itemLink, itemName) {
  container.prepend(createCard(itemName, itemLink, cardsTemplate));
};


//Добавление новых карточек из формы
function addCardElement(data) {
  addedCards.addItem(data)
  addCardPopup.close()
  imageAddForm.reset();
};

//Подключение валидации
const addCardFormValidator = new FormValidator(validationConfig, imageAddForm);
const editProfileFormValidator = new FormValidator(validationConfig, formProfile);
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

//Закрытие на крестик и работа формы
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupWithImage.setEventListeners();


profileButton.addEventListener('click', () => {
  editProfilePopup.open()
  userInfoProfile.getUserInfo(nameInput, jobInput)
  editProfileFormValidator.hideError();
});

addElementButton.addEventListener('click', () => {
  addCardPopup.open()
  imageAddForm.reset();
  addCardFormValidator.hideError()
});