import { Popup } from './Popup.js'
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues() {
    this._values = {};
    this._inputs = [...this._form.querySelectorAll('.form__input')]
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

 close() {
    this._form.reset();
    super.close();
  }
}