let popup = document.querySelector('#profileEditForm');
let profileButton = document.querySelector('.profile-info__button');
let popupClose = document.querySelector('.popup__close-button');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');
let formProfile = document.querySelector('#profileForm')
let profileInfoName = document.querySelector('.profile-info__name');
let profileInfoJob = document.querySelector('.profile-info__job');
const elementList = document.querySelector('.elements__list');
const addElementButton = document.querySelector('.profile__add-button');
const elementAddForm = document.querySelector('#elementAddForm')

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

// Открытие попапа
let openPopup = () => {
  popup.classList.add('popup_opened');
  nameInput.value = profileInfoName.textContent;
  jobInput.value = profileInfoJob.textContent;
}
// Закрытие попапа
let closePopup = () => {
  popup.classList.remove('popup_opened')
}

// Отправка формы редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileInfoName.textContent = nameInput.value;
  profileInfoJob.textContent = jobInput.value;
  closePopup()
}

//Загрузка первых карточек
const loadCards = initialCards.forEach((item) => {
  const cardsTemplate = document.querySelector('#cardsElement').content;
  const cardsElement = cardsTemplate.querySelector('.element').cloneNode('true');
  cardsElement.querySelector('.element__image').src = item.link;
  cardsElement.querySelector('.element__image').alt = item.name;
  cardsElement.querySelector('.element__name').textContent = item.name;
  elementList.append(cardsElement);

  cardsElement.querySelector('.element__button-heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-heart_active');
  })
});

//Открытие формы добавления карточки
addElementButton.addEventListener('click', function () {
  elementAddForm.classList.add('popup_opened');
});
// Закрытие формы добавления карточки - переделать!
const elementX = elementAddForm.querySelector('.popup__close-button');

elementX.addEventListener('click', function () { elementAddForm.classList.remove('popup_opened') });


profileButton.addEventListener('click', openPopup);

popupClose.addEventListener('click', closePopup);

formProfile.addEventListener('submit', formSubmitHandler);