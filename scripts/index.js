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

import { Popup } from './Popup.js';
const PopupAddImage = new Popup('#elementAddForm');

import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo} from './UserInfo.js';

const popupWithImage = new PopupWithImage('#imagePopup');
const editProfilePopup = new PopupWithForm('#profileEditForm', formEditProfileSubmitHandler);
const addCardPopup = new PopupWithForm('#elementAddForm', addCardElement);
const userInfoProfile = new UserInfo({name:'.profile-info__name', job: '.profile-info__job'});

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

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

//Загрузка первых карточек
initialCards.forEach(function (item) {
  renderCard(elementList, item.link, item.name)
})


//Добавление новых карточек из формы
function addCardElement() {
  renderCard(elementList, urlImage.value, nameImage.value);
  addCardPopup.close()
  imageAddForm.reset();
};

//Подключение валидации
const addCardFormValidator = new FormValidator(validationConfig, imageAddForm);
const editProfileFormValidator = new FormValidator(validationConfig, formProfile);
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation()

//Закрытие на крестик
editProfilePopup.setEventListeners();
PopupAddImage.setEventListeners();  //проверь закррытие на "крестик"? Дублирование методов
popupWithImage.setEventListeners();

//Закрытие на оверлей и крестик
editProfilePopup.setCloseByOverlayClickListener();
addCardPopup.setCloseByOverlayClickListener();
popupWithImage.setCloseByOverlayClickListener();


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