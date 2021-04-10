//Показать сообщение об ошибке
function showInputMessage(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
}

//Скрыть сообщение об ошибке
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove('form__input-error_active');
}

//Проверка на валидность
function checkInputValidity(formElement, inputElement) {
  const isValidity = inputElement.validity.valid;
  if (isValidity) {
    hideInputError(formElement, inputElement)
  } else {
    const errorMessage = inputElement.validationMessage;
    showInputMessage(formElement, inputElement, errorMessage)
  }
}
//Проверка на валидность каждого поля
function setEventListeners(formElement, inputSelector, submitButtonSelector) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const button = formElement.querySelector(submitButtonSelector)

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (event) => {
      checkInputValidity(formElement, inputElement);
      toggleButton(inputList, button)
    });
  });
  toggleButton(inputList, button)
}
//Переключение кнопки
function toggleButton(inputList, button) {
  const hasNotValid = inputList.some((inputElement) => !inputElement.validity.valid);
  if (hasNotValid) {
    button.setAttribute('disabled', true);
    button.classList.add('form__button_inactive')
  } else {
    button.removeAttribute('disabled', true);
    button.classList.remove('form__button_inactive')
  }
}

function enebleValidation({ formSelector, inputSelector, submitButtonSelector }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector)
  })
}
/*formSelector , inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass */
/* enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_active'
}); */

enebleValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
})