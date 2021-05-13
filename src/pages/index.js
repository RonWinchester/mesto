import { Card } from '../components/Card.js';
import './index.css';
import { FormValidator } from '../components/FormValidator.js';
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
} from '../components/utils/constants.js';

import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const initialСards = new Section({
  items: initialCards,
  renderer: (data) => {
    const cardElement = createCard(data.name, data.link)
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
    const cardElement = createCard(data.nameImageElement, data.urlImageElement)
    imageAddForm.reset();
    addCardPopup.close()
    initialСards.addItem(cardElement)
  });

const userInfoProfile = new UserInfo({ name: '.profile-info__name', job: '.profile-info__job' });

//Инициализация карточки
function createCard(dataName, dataLink) {
  const card = new Card(dataName, dataLink, cardsTemplate, popupWithImage.open);
  return card.getCardElement();
};

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
  const profileValue = userInfoProfile.getUserInfo();
  nameInput.value = profileValue.name;
  jobInput.value = profileValue.job;
  editProfileFormValidator.hideError();
});

addElementButton.addEventListener('click', () => {
  imageAddForm.reset();
  addCardPopup.open()
  addCardFormValidator.hideError()
});