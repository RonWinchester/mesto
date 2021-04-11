//Показать сообщение об ошибке
function showInputMessage(formElement, inputElement, errorMessage, errorClass, inputErrorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass)
}

//Скрыть сообщение об ошибке
function hideInputError(formElement, inputElement, errorClass, inputErrorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass)
}

//Проверка на валидность
function checkInputValidity(formElement, inputElement, errorClass, inputErrorClass) {
  const isValidity = inputElement.validity.valid;
  if (isValidity) {
    hideInputError(formElement, inputElement, errorClass, inputErrorClass)
  } else {
    const errorMessage = inputElement.validationMessage;
    showInputMessage(formElement, inputElement, errorMessage, errorClass, inputErrorClass)
  }
}
//Проверка на валидность каждого поля
function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const button = formElement.querySelector(submitButtonSelector)

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, errorClass, inputErrorClass);
      toggleButton(inputList, button, inactiveButtonClass)
    });
  });
  addElementButton.addEventListener('click', function () {
    toggleButton(inputList, button, inactiveButtonClass)
  });
  profileButton.addEventListener('click', function () {
    toggleButton(inputList, button, inactiveButtonClass);
  });
}

//Переключение кнопки
function toggleButton(inputList, button, inactiveButtonClass) {
  const hasNotValid = inputList.some((inputElement) => !inputElement.validity.valid);
  if (hasNotValid) {
    button.setAttribute('disabled', true);
    button.classList.add(inactiveButtonClass)
  } else {
    button.removeAttribute('disabled', true);
    button.classList.remove(inactiveButtonClass)
  }
}

function enebleValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)
  })
}

enebleValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  errorClass: 'form__input-error_active',
  inputErrorClass: 'form__input_type_error'
})