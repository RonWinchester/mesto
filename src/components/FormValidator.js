import { addElementButton, profileButton } from './utils/constants.js'
export class FormValidator {
  constructor(validationConfig, formElement) {
    this._formElement = formElement;

    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._errorClass = validationConfig.errorClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
  }

  //Показать сообщение об ошибке
  _showInputMessage(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //Скрыть сообщение об ошибке
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  //Проверка на валидность
  _checkInputValidity(formElement, inputElement) {
    const isValidity = inputElement.validity.valid;
    if (isValidity) {
      this._hideInputError(formElement, inputElement);
      inputElement.classList.remove(this._inputErrorClass)
    } else {
      const errorMessage = inputElement.validationMessage;
      this._showInputMessage(formElement, inputElement, errorMessage);
      inputElement.classList.add(this._inputErrorClass);
    }
  }

  //Переключение кнопки
  _toggleButton(inputList, button) {
    const hasNotValid = inputList.some((inputElement) => !inputElement.validity.valid);
    if (hasNotValid) {
      button.setAttribute('disabled', true);
      button.classList.add(this._inactiveButtonClass)
    } else {
      button.removeAttribute('disabled');
      button.classList.remove(this._inactiveButtonClass)
    }
  }

  //Проверка на валидность каждого поля
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const button = formElement.querySelector(this._submitButtonSelector);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButton(inputList, button)
      });
    });

    addElementButton.addEventListener('click', () => {
      this._toggleButton(inputList, button)
    });
    profileButton.addEventListener('click', () => {
      this._toggleButton(inputList, button);
    });
  }

  //Скрыть старое сообщение об ошибке
  hideError() {
    const inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputElements.forEach(inputElement => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      errorElement.textContent = '';
      errorElement.classList.remove(this._errorClass);
      inputElement.classList.remove(this._inputErrorClass);
    })
  }

  enableValidation() {
    this._setEventListeners(this._formElement)
  }

}
