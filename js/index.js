/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-template */
// // eslint-disable-next-line lines-around-directive, strict

// "use strict";

function loginValidator(loginString, regObj) {
  const regExpEmail = new RegExp(regObj.regemail);
  const regExpPhone = new RegExp(regObj.regphone);
  if (!regExpEmail.test(loginString) && !regExpPhone.test(loginString)) {
    return "Некорректный логин";
  }
  return undefined;
}

function phoneValidator(phoneString, regStr) {
  const regEx = new RegExp(regStr);
  if (!regEx.test(phoneString)) {
    return "Неверно введен номер телефона";
  }
  return undefined;
}

function emailValidator(emailString, regStr) {
  const regEx = new RegExp(regStr);
  if (!regEx.test(emailString)) {
    return "Некорректный email";
  }
  return undefined;
}

function kirillicValidator(kirillicString, regStr) {
  const regEx = new RegExp(regStr);
  if (!regEx.test(kirillicString)) {
    return "Только кириллица";
  }
  return undefined;
}

function companyValidator(companyString, regStr) {
  const regEx = new RegExp(regStr);
  if (!regEx.test(companyString)) {
    return "Недопустимое название";
  }
  return undefined;
}

function showError(input, errorMessage) {
  input.classList.add("error");
  const errorElement = document.querySelector(
    "#" + input.id + " + .errorMessage"
  );
  errorElement.innerHTML = errorMessage;
}

function hideError(event) {
  const input = event.target;
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

  inputs.map(function (input) {
    switch (input.name) {
      case "phone":
        {
          const errorMessage = phoneValidator(
            input.value,
            input.dataset.regstr
          );
          if (errorMessage) {
            showError(input, errorMessage);
            isFormValid = false;
          } else {
            formData[input.name] = input.value;
          }
        }
        break;
      case "email":
        {
          const errorMessage = emailValidator(
            input.value,
            input.dataset.regstr
          );
          if (errorMessage) {
            showError(input, errorMessage);
            isFormValid = false;
          } else {
            formData[input.name] = input.value;
          }
        }
        break;
      case "company":
        {
          const errorMessage = companyValidator(
            input.value,
            input.dataset.regstr
          );
          if (errorMessage) {
            showError(input, errorMessage);
            isFormValid = false;
          } else {
            formData[input.name] = input.value;
          }
        }
        break;
      case "login":
        {
          const errorMessage = loginValidator(input.value, input.dataset);
          if (errorMessage) {
            showError(input, errorMessage);
            isFormValid = false;
          } else {
            formData[input.name] = input.value;
          }
        }
        break;
      default:
        {
          const errorMessage = kirillicValidator(
            input.value,
            input.dataset.regstr
          );
          if (errorMessage) {
            showError(input, errorMessage);
            isFormValid = false;
          } else {
            formData[input.name] = input.value;
          }
        }
        break;
    }
  });
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
  document.querySelector(".flex__container").classList.remove("hide");
  formToHide.classList.remove("show");
  formToHide.classList.add("hide");
}
