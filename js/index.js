/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-template */
// // eslint-disable-next-line lines-around-directive, strict

// "use strict";

const KIRILLIC_REGEX = /^([А-Яа-я]){2,20}$/;
const PHONE_REGEX = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
const COMPANY_REGEX = /^[A-Za-zА-Яа-я0-9_\-\+\.@ ]+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const errorMessages = new Map([
  ["kirillic", { message: "Только кириллица", validator: KIRILLIC_REGEX }],
  [
    "phone",
    { message: "Неверно введен номер телефона", validator: PHONE_REGEX }
  ],
  ["company", { message: "Недопустимое название", validator: COMPANY_REGEX }],
  ["email", { message: "Некорректный email", validator: EMAIL_REGEX }]
]);

function validator(string, regex) {
  return regex.test(string);
}

function showError(input, errorMessage) {
  input.classList.add("error");
  const errorElement = document.querySelector(
    "#" + input.id + " + .errorMessage"
  );
  errorElement.innerHTML = errorMessage;
}

function hideError(input) {
  input.classList.remove("error");
  const errorElement = document.querySelector(
    "#" + input.id + " + .errorMessage"
  );
  errorElement.innerHTML = "";
}

function formValidator(event) {
  event.preventDefault();
  let isFormValid = true;
  const formData = {};
  const formId = event.target.id;

  // Для совместимости с IE11
  const inputs = [];
  const temp = document.querySelectorAll(
    "#" + formId + " > input[type='text']"
  );
  for (let i = 0; i < temp.length; i += 1) {
    inputs.push(temp[i]);
  }
  inputs.forEach(function (input) {
    const rules = input.dataset.rule.split(", ");
    const errors = [];
    rules.forEach(function (rule) {
      if (!validator(input.value, errorMessages.get(rule).validator)) {
        errors.push(errorMessages.get(rule).message);
      } else {
        formData[input.name] = input.value;
      }
    });
    if (errors.length === rules.length) {
      showError(input, errors.pop());
      isFormValid = false;
    }
  });

  const checkbox = document.querySelector(
    "#" + formId + " > input[type='checkbox']"
  );

  formData[checkbox.name] = checkbox.checked;

  if (isFormValid) {
    console.log(JSON.stringify(formData));
  }
}

function showForm(event) {
  const formToShow = document.getElementById(event.target.dataset.form);
  document.querySelector(".flex__container").classList.add("hide");
  formToShow.classList.remove("hide");
  formToShow.classList.add("show");
}

function hideForm(event) {
  const formToHide = document.getElementById(event.target.dataset.form);

  const form = document.querySelector("#" + formToHide.id + " .form");

  const inputs = document.querySelectorAll(
    "#" + form.id + " > input[type='text']"
  );

  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].value = "";
    hideError(inputs[i]);
  }

  document.querySelector(".flex__container").classList.remove("hide");
  formToHide.classList.remove("show");
  formToHide.classList.add("hide");
}
