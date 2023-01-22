/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-template */
// // eslint-disable-next-line lines-around-directive, strict

// "use strict";

function LoginValidator(loginString, regObj) {
  const regExpEmail = new RegExp(regObj.regemail);
  const regExpPhone = new RegExp(regObj.regphone);
  if (!regExpEmail.test(loginString) && !regExpPhone.test(loginString)) {
    return "Некорректный логин";
  }
  return undefined;
}

function PhoneValidator(phoneString, regStr) {
  const regEx = new RegExp(regStr);
  if (!regEx.test(phoneString)) {
    return "Неверно введен номер телефона";
  }
  return undefined;
}

function EmailValidator(emailString, regStr) {
  const regEx = new RegExp(regStr);
  if (!regEx.test(emailString)) {
    return "Некорректный email";
  }
  return undefined;
}

function KirillicValidator(kirillicString, regStr) {
  const regEx = new RegExp(regStr);
  if (!regEx.test(kirillicString)) {
    return "Только кириллица";
  }
  return undefined;
}

function CompanyValidator(companyString, regStr) {
  const regEx = new RegExp(regStr);
  if (!regEx.test(companyString)) {
    return "Недопустимое название";
  }
  return undefined;
}

function ShowError(input, errorMessage) {
  input.classList.add("error");
  const errorElement = document.querySelector(
    "#" + input.id + " + .errorMessage"
  );
  errorElement.innerHTML = errorMessage;
}

function HideError(event) {
  const input = event.target;
  input.classList.remove("error");
  const errorElement = document.querySelector(
    "#" + input.id + " + .errorMessage"
  );
  errorElement.innerHTML = "";
}

function FormValidator(event) {
  event.preventDefault();

  const formId = event.target.id;

  // Для совместимости с IE11
  const inputs = [];
  const temp = document.querySelectorAll(
    "#" + formId + " > input[type='text']"
  );
  for (let i = 0; i < temp.length; i += 1) {
    inputs.push(temp[i]);
  }

  inputs.map(function (input) {
    switch (input.name) {
      case "phone":
        {
          const errorMessage = PhoneValidator(
            input.value,
            input.dataset.regstr
          );
          if (errorMessage) {
            ShowError(input, errorMessage);
          }
        }
        break;
      case "email":
        {
          const errorMessage = EmailValidator(
            input.value,
            input.dataset.regstr
          );
          if (errorMessage) {
            ShowError(input, errorMessage);
          }
        }
        break;
      case "company":
        {
          const errorMessage = CompanyValidator(
            input.value,
            input.dataset.regstr
          );
          if (errorMessage) {
            ShowError(input, errorMessage);
          }
        }
        break;
      case "login":
        {
          const errorMessage = LoginValidator(input.value, input.dataset);
          if (errorMessage) {
            ShowError(input, errorMessage);
          }
        }
        break;
      default:
        {
          const errorMessage = KirillicValidator(
            input.value,
            input.dataset.regstr
          );
          if (errorMessage) {
            ShowError(input, errorMessage);
          }
        }
        break;
    }
  });
}

function ShowForm(event) {
  const formToShow = document.getElementById(event.target.dataset.form);
  document.querySelector(".flex__container").classList.add("hide");
  formToShow.classList.remove("hide");
  formToShow.classList.add("show");
}

function HideForm(event) {
  const formToHide = document.getElementById(event.target.dataset.form);
  document.querySelector(".flex__container").classList.remove("hide");
  formToHide.classList.remove("show");
  formToHide.classList.add("hide");
}
