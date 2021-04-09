const popupEditForm = document.querySelector('#profileEditForm');
const elementAddForm = document.querySelector('#elementAddForm');
const imagePopup = document.querySelector('#imagePopup');

const profileButton = document.querySelector('.profile-info__button');
const addElementButton = document.querySelector('.profile__add-button');

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
function openPopup(popup) {
  popup.classList.add('popup_opened')
};

//Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened')
};

// Отправка формы редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileInfoName.textContent = nameInput.value;
  profileInfoJob.textContent = jobInput.value;
  closePopup(popupEditForm);
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
  const imagePopupPicture = imagePopup.querySelector('.popup__image-figure');
  const imagePopupFigcaption = imagePopup.querySelector('.popup__figcaption');
  imagePopupPicture.src = item.src;
  imagePopupPicture.alt = item.textContent;
  imagePopupFigcaption.textContent = item.alt;
  openPopup(imagePopup);

  const popupImageCloseButton = imagePopup.querySelector('.popup__close-button');

  popupImageCloseButton.addEventListener('click', () => {
    closePopup(imagePopup);
  });

}

// Инициализация карточки
function getCardElement(itemLink, itemName) {
  const cardsElement = cardsTemplate.querySelector('.element').cloneNode('true');
  const imageElement = cardsElement.querySelector('.element__image');
  imageElement.src = itemLink;
  imageElement.alt = itemName;
  cardsElement.querySelector('.element__name').textContent = itemName;

  likeToggleCards(cardsElement);
  removeCards(cardsElement);

  imageElement.addEventListener('click', () => {
    generateCard(imageElement)
  });

  return cardsElement
}

//Добавление карточки в контейнер
function renderCard(container, itemLink, itemName) {
  container.prepend(getCardElement(itemLink, itemName));
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


profileButton.addEventListener('click', () => {
  openPopup(popupEditForm)
  nameInput.value = profileInfoName.textContent;
  jobInput.value = profileInfoJob.textContent;
});

addElementButton.addEventListener('click', () => {
  openPopup(elementAddForm)
});

popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEditForm)
});

popupAddCloseButton.addEventListener('click', () => {
  closePopup(elementAddForm)
});

formProfile.addEventListener('submit', formSubmitHandler);

imageAddForm.addEventListener('submit', addCardElement);

//Закрытие попапа на оверлей

const popupOverlays = document.querySelectorAll('.popup');

function closeOverlay(popupElement) {
  popupElement.addEventListener('click', () => {
    closePopup(popupElement)
  });
}

function closeOverlayKey(popupElement) {
  popupElement.addEventListener('keydown', function(event) {
    console.log(event)
  });
}

function stopClosePopup(popupElement) {
  let popupOverlayContent = Array.prototype.slice.call(popupElement.childNodes);
  popupOverlayContent.forEach(function (elem) {
    elem.addEventListener('click', function (event) {
      event.stopImmediatePropagation();
    })
  })
}

popupOverlays.forEach(function (item) {
  closeOverlay(item);
  stopClosePopup(item);
  closeOverlayKey(item)
})
