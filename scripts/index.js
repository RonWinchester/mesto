let popup = document.querySelector('.popup');
let profileButton = document.querySelector('.profile-info__button')
let popupClose = document.querySelector('.popup__close-button');

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

profileButton.addEventListener('click', openPopup);

popupClose.addEventListener('click', closePopup);



function formSubmitHandler(evt) {
  evt.preventDefault();
  profileInfoName.textContent = nameInput.value;
  profileInfoJob.textContent = jobInput.value;
  closePopup()
}

form.addEventListener('submit', formSubmitHandler);