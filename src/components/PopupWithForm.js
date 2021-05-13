import { Popup } from './Popup.js'
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
    this._buttonSubmit = this._form.querySelector('.form__button');
    this._inputs = [...this._form.querySelectorAll('.form__input')]
  }

  _getInputValues() {
    this._values = {};
    this._inputs.forEach(input => {
      this._values[input.name] = input.value
    })
    return this._values
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    })
  }
  open() {
    super.open();
    this._buttonSubmit.classList.add('form__button_inactive');
    this._buttonSubmit.setAttribute('disabled', true);
  }
  close() {
    super.close();
    this._form.reset();
  }
}