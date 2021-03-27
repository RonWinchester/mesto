const popupEditForm = document.querySelector('#profileEditForm');
const elementAddForm = document.querySelector('#elementAddForm');

const profileButton = document.querySelector('.profile-info__button');
const addElementButton = document.querySelector('.profile__add-button');

const formProfile = document.querySelector('#profileForm');
const nameInput = document.querySelector('#nameInput');
const jobInput = document.querySelector('#jobInput');
const profileInfoName = document.querySelector('.profile-info__name');
const profileInfoJob = document.querySelector('.profile-info__job');

const elementList = document.querySelector('.elements__list');

const cardsTemplate = document.querySelector('#cardsElement').content;

const ImageAddForm = document.querySelector('#ImageAddForm');
const nameImage = document.querySelector('#nameImage');
const urlImage = document.querySelector('#urlImage');

//Кнопки закрытия попапов
const popupEditCloseButton = popupEditForm.querySelector('.popup__close-button');
const popupAddCloseButton = elementAddForm.querySelector('.popup__close-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Открытие и закрытие попапа
function togglePopupWindow(popup) {
  popup.classList.toggle('popup_opened')
};

// Отправка формы редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileInfoName.textContent = nameInput.value;
  profileInfoJob.textContent = jobInput.value;
  togglePopupWindow(popupEditForm);
}

//Загрузка первых карточек
const loadCards = initialCards.forEach((item) => {
  const cardsElement = cardsTemplate.querySelector('.element').cloneNode('true');
  cardsElement.querySelector('.element__image').src = item.link;
  cardsElement.querySelector('.element__image').alt = item.name;
  cardsElement.querySelector('.element__name').textContent = item.name;
  elementList.append(cardsElement);

  cardsElement.querySelector('.element__button-heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-heart_active');
  })

  // Удаление карточки
  const buttonRemove = cardsElement.querySelector('.element__button-remove');
  buttonRemove.addEventListener('click', () => {
    cardsElement.remove();
  })
});

//Добавление новых карточек из формы
function addCardElement(evt) {
  evt.preventDefault();
  const cardsElement = cardsTemplate.querySelector('.element').cloneNode('true');
  cardsElement.querySelector('.element__image').src = urlImage.value;
  cardsElement.querySelector('.element__image').alt = nameImage.value;
  cardsElement.querySelector('.element__name').textContent = nameImage.value;
  elementList.prepend(cardsElement);

  cardsElement.querySelector('.element__button-heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-heart_active');
  })

  urlImage.value = '';
  nameImage.value = '';

  // Удаление карточки
  const buttonRemove = cardsElement.querySelector('.element__button-remove');
  buttonRemove.addEventListener('click', () => {
    cardsElement.remove();
  })
  togglePopupWindow(elementAddForm)
}

profileButton.addEventListener('click', () => {
  togglePopupWindow(popupEditForm)
  nameInput.value = profileInfoName.textContent;
  jobInput.value = profileInfoJob.textContent;
});

addElementButton.addEventListener('click', () => {
  togglePopupWindow(elementAddForm)
});

popupEditCloseButton.addEventListener('click', () => {
  togglePopupWindow(popupEditForm)
});

popupAddCloseButton.addEventListener('click', () => {
  togglePopupWindow(elementAddForm)
});

formProfile.addEventListener('submit', formSubmitHandler);

ImageAddForm.addEventListener('submit', addCardElement);
