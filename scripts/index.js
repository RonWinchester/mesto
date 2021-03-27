let popup = document.querySelector('#profileEditForm');
let profileButton = document.querySelector('.profile-info__button');
let popupClose = document.querySelectorAll('.popup__close-button');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');
let formProfile = document.querySelector('#profileForm')
let profileInfoName = document.querySelector('.profile-info__name');
let profileInfoJob = document.querySelector('.profile-info__job');
const elementList = document.querySelector('.elements__list');
const addElementButton = document.querySelector('.profile__add-button');
const elementAddForm = document.querySelector('#elementAddForm');
const cardsTemplate = document.querySelector('#cardsElement').content;
const nameImage = document.querySelector('#nameImage');
const urlImage = document.querySelector('#urlImage');
const ImageAddForm = document.querySelector('#ImageAddForm')

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

// Открытие попапа профиля
let openPopup = () => {
  popup.classList.add('popup_opened');
  nameInput.value = profileInfoName.textContent;
  jobInput.value = profileInfoJob.textContent;
}
// Закрытие попапа профиля
let closePopup = (anyPopup) => {
  anyPopup.classList.remove('popup_opened')
};

// Отправка формы редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileInfoName.textContent = nameInput.value;
  profileInfoJob.textContent = jobInput.value;
  closePopup(popup)
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
  closePopup(elementAddForm)
}


//Открытие формы добавления карточки
addElementButton.addEventListener('click', function () {
  elementAddForm.classList.add('popup_opened');
});
/* // Закрытие формы добавления карточки - переделать!
const elementX = elementAddForm.querySelector('.popup__close-button'); */

/* elementX.addEventListener('click', function () { elementAddForm.classList.remove('popup_opened') });
 */
profileButton.addEventListener('click', openPopup);

/* popupClose.addEventListener('click', closePopup);
 */

popupClose.forEach((item) => {
  item.addEventListener('click', function (e) {
    const eventTarget = e.target.parentNode;
    closePopup(eventTarget.parentNode)
  });
})

formProfile.addEventListener('submit', formSubmitHandler);

ImageAddForm.addEventListener('submit', addCardElement);