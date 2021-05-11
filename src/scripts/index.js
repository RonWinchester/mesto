import { Card } from './Card.js';
import '../pages/index.css';
import { FormValidator } from './FormValidator.js';
import {
  validationConfig,
  profileButton,
  addElementButton,
  formProfile,
  nameInput,
  jobInput,
  elementList,
  cardsTemplate,
  imageAddForm,
  initialCards,
} from './constants.js';

import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const addedCards = new Section({ items: {}, renderer: () => { } }, elementList);
const initialСards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, cardsTemplate, popupWithImage.open);
    const cardElement = card.getCardElement();

    initialСards.addItem(cardElement)
  }
}, elementList);

const popupWithImage = new PopupWithImage('#imagePopup');
const editProfilePopup = new PopupWithForm('#profileEditForm',
  function formEditProfileSubmitHandler(data) {
    userInfoProfile.setUserInfo(data)
    editProfilePopup.close()
  });
const addCardPopup = new PopupWithForm('#elementAddForm',
  function handleFormSubmit(data) {
    const card = new Card(data.nameImageElement, data.urlImageElement, cardsTemplate, popupWithImage.open);
    const cardElement = card.getCardElement();
    imageAddForm.reset();
    addCardPopup.close()
    addedCards.addItem(cardElement)

  });

const userInfoProfile = new UserInfo({ name: '.profile-info__name', job: '.profile-info__job' });

//Загрузка первых карточек
initialСards.rendererElements()

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