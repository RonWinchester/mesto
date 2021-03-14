let popup = document.querySelector('.popup');
let profileButton = document.querySelector('.profile-info__button')
let popupProfileClose = document.querySelector('.popup__close-button');
let popupContent = document.querySelector('.popup__content');
let popupSaveButton = document.querySelector('.form__button');
let nameInput = document.querySelector('#nameInput');
let jobInput = document.querySelector('#jobInput');
let form = document.querySelector('.form')
let profileInfoName = document.querySelector('.profile-info__name');
let profileInfoJob = document.querySelector('.profile-info__job');



let openPopup = () => {
  popup.classList.add('popup_opened');
  nameInput.value = profileInfoName.textContent;
  jobInput.value = profileInfoJob.textContent;
}

let closePopup = () => {
  popup.classList.remove('popup_opened')
}

profileButton.addEventListener('click', function (){
  openPopup();
});

popupProfileClose.addEventListener('click', closePopup);

popup.addEventListener('click', closePopup);
popupSaveButton.addEventListener('click', closePopup);
popupContent.addEventListener('click', function(e) {
  event.stopImmediatePropagation();
})

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileInfoName.textContent = nameInput.value;
  profileInfoJob.textContent = jobInput.value;
}

form.addEventListener('submit', formSubmitHandler);