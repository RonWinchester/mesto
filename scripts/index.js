import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  errorClass: 'form__input-error_active',
  inputErrorClass: 'form__input_type_error'
}

export const profileButton = document.querySelector('.profile-info__button');
export const addElementButton = document.querySelector('.profile__add-button');

const popupEditForm = document.querySelector('#profileEditForm');
const elementAddForm = document.querySelector('#elementAddForm');
export const imagePopup = document.querySelector('#imagePopup');

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

export const imagePopupPicture = imagePopup.querySelector('.popup__image-figure');
export const imagePopupFigcaption = imagePopup.querySelector('.popup__figcaption');


// Закрытие попапа на Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// Открытие попапа
export function openPopup(popup) {
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


//Закрытие попапа на оверлей
function setCloseByOverlayClickListener(popupElement) {
  popupElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-button')) {
      closePopup(popupElement)
    }
  });
}

//Добавление карточки в контейнер
function renderCard(container, itemLink, itemName) {
  const card = new Card(itemName, itemLink, cardsTemplate, imagePopup, imagePopupPicture, imagePopupFigcaption);
  container.prepend(card.getCardElement());
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

//Подключение валидации
const validation = new FormValidator(validationConfig, elementAddForm);
const validation1 = new FormValidator(validationConfig, popupEditForm);

validation.enebleValidation()
validation1.enebleValidation()

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
