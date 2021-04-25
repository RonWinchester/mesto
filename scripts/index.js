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
  popupEditCloseButton,
  popupAddCloseButton,
  popupCloseButtonImage,
} from './constants.js';
import { openPopup, closePopup } from './utils.js'

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

//Создание карточки
function createCard(itemName, itemLink, cardsTemplate) {
  const card = new Card(itemName, itemLink, cardsTemplate);
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
function addCardElement(evt) {
  evt.preventDefault()
  renderCard(elementList, urlImage.value, nameImage.value)
  closePopup(elementAddForm)
  imageAddForm.reset()
};

//Подключение валидации
const addCardFormValidator = new FormValidator(validationConfig, imageAddForm);
const editProfileFormValidator = new FormValidator(validationConfig, formProfile);
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation()

profileButton.addEventListener('click', () => {
  openPopup(popupEditForm)
  nameInput.value = profileInfoName.textContent;
  jobInput.value = profileInfoJob.textContent;
  editProfileFormValidator.hideError();
});


addElementButton.addEventListener('click', () => {
  openPopup(elementAddForm);
  imageAddForm.reset();
  addCardFormValidator.hideError()
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
