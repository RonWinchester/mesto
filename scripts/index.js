const popupEditForm = document.querySelector('#profileEditForm');
const elementAddForm = document.querySelector('#elementAddForm');
const imagePopupTemplate = document.querySelector('#imagePopup').content;


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

// Открытие попапа карточки
function generateCard(item) {
  const imagePopup = imagePopupTemplate.querySelector('.popup').cloneNode('true');
  const imagePopupPicture = imagePopup.querySelector('.popup__image-figure');
  const imagePopupFigcaption = imagePopup.querySelector('.popup__figcaption');
  imagePopupPicture.src = item.src;
  imagePopupPicture.alt = item.textContent;
  imagePopupFigcaption.textContent = item.alt;
  togglePopupWindow(imagePopup);
  elementList.after(imagePopup);

  const popupImageCloseButton = imagePopup.querySelector('.popup__close-button');

  popupImageCloseButton.addEventListener('click', () => {
    togglePopupWindow(imagePopup);
    imagePopup.remove()
  });

}

//Загрузка первых карточек
function loadCards(item) {
  const cardsElement = cardsTemplate.querySelector('.element').cloneNode('true');
  cardsElement.querySelector('.element__image').src = item.link;
  cardsElement.querySelector('.element__image').alt = item.name;
  cardsElement.querySelector('.element__name').textContent = item.name;
  elementList.append(cardsElement);

  likeToggleCards(cardsElement);
  removeCards(cardsElement);

  const imageElement = cardsElement.querySelector('.element__image');

  imageElement.addEventListener('click', () => {
    generateCard(imageElement)
  });
}

//Добавление новых карточек из формы
function addCardElement(evt) {
  evt.preventDefault();
  const cardsElement = cardsTemplate.querySelector('.element').cloneNode('true');
  cardsElement.querySelector('.element__image').src = urlImage.value;
  cardsElement.querySelector('.element__image').alt = nameImage.value;
  cardsElement.querySelector('.element__name').textContent = nameImage.value;
  elementList.prepend(cardsElement);
  urlImage.value = '';
  nameImage.value = '';

  likeToggleCards(cardsElement);
  removeCards(cardsElement)
  togglePopupWindow(elementAddForm)

  const picturesCards = cardsElement.querySelector('.element__image');

  picturesCards.addEventListener('click', () => {
    generateCard(picturesCards)
  });
};

initialCards.forEach(loadCards)

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
