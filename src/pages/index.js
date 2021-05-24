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
  avatarProfile,
  editAvatarImage
} from '../components/utils/constants.js';

import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { Popup } from '../components/Popup.js';

//Подключение к Api
const api = new Api({
  adress: "https://mesto.nomoreparties.co/v1/",
  token: "30104c84-de4d-41a2-bc56-a72d831bec2a",
  groupId: 'cohort-24'
})

const userInfoProfile = new UserInfo({ name: '.profile-info__name', about: '.profile-info__job', avatar: '.profile__avatar' });
let userData = null;


//Загрузка данных профиля
api.getUserInformation()
  .then(result => {
    userInfoProfile.setUserInfo(result);
    userInfoProfile.setUserAvatar(result);
    userData = result;
  })
  .catch(err => {
    console.log(`Ошибка при получении данных профиля: ${err}`)
  })

//Инициализация карточки
function createCard(cardData) {
  const card = new Card(cardData,
    cardsTemplate,
    popupWithImage.open,
    handleDeleteIconClick,
    deleteCard,
    removeIcon,
    userData,
    putLike,
    deleteLike,
    loadLike
  );
  return card.getCardElement();
};


const initialСards = new Section({
  items: {},
  renderer: (data) => {
    const cardElement = createCard(data)
    initialСards.addItem(cardElement, false)
  }
}, elementList);

//Загрузка первых карточек
api.getCards()
  .then(result => {
    initialСards.renderItems(result)
  })
  .catch(err => {
    console.log(`Ошибка при загрузке карточек: ${err}`)
  }
  );

//Попап редактировния профиля
const editProfilePopup = new PopupWithForm('#profileEditForm',
  function formEditProfileSubmitHandler(data) {
    api.patchUserInformation(data)
      .then(result => {
        userInfoProfile.setUserInfo(result);
      })
      .catch(err => { console.log(`Ошибка при отправке данных профиля: ${err}`) })
    editProfilePopup.close()
  });

//Попап редактирования аватара
const editAvatar = new PopupWithForm('#avatarEditForm',
  function formAvatarSubmitHandler(data) {
    api.pathcAvatar(data.urlAvatarElement)
      .then(res => {
        userInfoProfile.setUserAvatar({ avatar: res.avatar })
      }).catch(err => { console.log(`Ошибка при редактировании аватара профиля: ${err}`) })
    avatarProfile.reset();
    editAvatar.close()
  })

//Попап добавления карточки
const addCardPopup = new PopupWithForm('#elementAddForm',
  function handleFormSubmit(data) {
    api.postCard({ name: data.nameImageElement, link: data.urlImageElement })
      .then(res => {
        const cardElement = createCard(res);
        initialСards.addItem(cardElement, true)
      })
      .catch(err => { console.log(`Ошибка при отправке карточки: ${err}`) })
    imageAddForm.reset();
    addCardPopup.close()
  });

//Работа с попапом удаления карточки
const cardDeletePopup = new Popup('#deletionCardForm')
cardDeletePopup.setEventListeners();

const handleDeleteIconClick = () => {
  cardDeletePopup.open();
}

//Удалить карточки
const deleteCard = (formRemove, removeCard, cardId) => {
  api.deleteCards(cardId).then(res => {
    formRemove.addEventListener('submit', (event) => {
      event.preventDefault();
      removeCard();
      cardDeletePopup.close();
    })
  }).catch(err => { console.log(`Ошибка при удалении карточки: ${err}`) })
}

//загрузить лайки
const loadLike = (cardLike, myId, elementButton, classActive) => {
  cardLike.forEach(element => {
    if (element._id === myId) {
      elementButton.classList.add(classActive)
    }
  })
}

// Удаление иконки у чужих карточек
const removeIcon = (cardId, userId, buttonRemove) => {
  if (cardId !== userId) {
    buttonRemove.remove()
  }
}

//Поставить лайк
const putLike = (cardId, likeNumber) => {
  api.putLikeCard(cardId)
    .then(res => {
      likeNumber.textContent = res.likes.length
    }).catch(err => { console.log(`Ошибка при отправке лайка карточки: ${err}`) })
};

//Убрать лайк
const deleteLike = (cardId, likeNumber) => {
  api.deleteLikeCard(cardId)
    .then(res => {
      likeNumber.textContent = res.likes.length
    }).catch(err => { console.log(`Ошибка при удалении лайка карточки: ${err}`) })
}

const popupWithImage = new PopupWithImage('#imagePopup');

//Подключение валидации
const addCardFormValidator = new FormValidator(validationConfig, imageAddForm);
const editProfileFormValidator = new FormValidator(validationConfig, formProfile);
const editAvatarFormVAlidator = new FormValidator(validationConfig, avatarProfile);
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
editAvatarFormVAlidator.enableValidation();

//Закрытие на крестик и работа формы
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupWithImage.setEventListeners();
editAvatar.setEventListeners();

editAvatarImage.addEventListener('click', () => {
  avatarProfile.reset();
  editAvatar.open();
  editAvatarFormVAlidator.hideError()
})

profileButton.addEventListener('click', () => {
  editProfilePopup.open();
  const profileValue = userInfoProfile.getUserInfo();
  nameInput.value = profileValue.name;
  jobInput.value = profileValue.about;
  editProfileFormValidator.hideError();
});

addElementButton.addEventListener('click', () => {
  imageAddForm.reset();
  addCardPopup.open()
  addCardFormValidator.hideError()
});
