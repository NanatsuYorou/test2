  "use strict";

  const REG_PHONE = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  const REG_EMAIL = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const REG_KIRILLIC = /^([А-Яа-я]){2,20}$/;
  const REG_COMPANY = /^[A-Za-zА-Яа-я0-9_\-\+\.@ ]+$/;

  function showForm(id) {
    document.querySelector('.flex__container').classList.add('hide');
    document.getElementById(id).classList.remove('hide');
    document.getElementById(id).classList.add('show');
  }

  function hideForm(id) {
    document.getElementById(id).classList.remove('show');
    document.getElementById(id).classList.add('hide');
    document.querySelector('.flex__container').classList.remove('hide');
    clearAllErrors();
  }

  function submitForm(event, form_id) {
    event.preventDefault();

    let form = document.getElementById(form_id);
    let form_data = {};
    let errors = [];

    for (let i = 0; i < form.elements.length; i++) {
      if (form.elements[i].type !== 'submit' && form.elements[i].type !== 'checkbox') {

        let isValid = validation(form.elements[i].name, form.elements[i].value).isValid;
        let errorMessage = validation(form.elements[i].name, form.elements[i].value).errorMessage;

        if (!isValid) {
          errors.push({i: i, errorMessage: errorMessage, inputName: form.elements[i].name});
        } else {
          form_data[form.elements[i].name] = form.elements[i].value;
        }
      } else if (form.elements[i].type == 'checkbox') {
        form_data[form.elements[i].name] = form.elements[i].checked;
      }
    }
    if (errors.length) {
      console.log('Есть ошибки при вводе данных');
      
      for (let i = 0; i < errors.length; i++) {
        form.elements[errors[i]['i']].classList.add('invalid');
        let coords = form.elements[errors[i]['i']].getBoundingClientRect();
        let span = document.createElement('span');

        span.innerText = errors[i].errorMessage;
        span.style.cssText = "position: absolute; color: red; font-family: 'Arial'";
        span.classList.add('error-message');
        span.id = errors[i].inputName + 'ErrorMessage';
        span.style.top = coords.bottom + window.pageYOffset + 5 + 'px';
        span.style.left = coords.left + window.pageXOffset + 10 + 'px';

        document.body.appendChild(span);
      }
    } else {
      console.log(JSON.stringify(form_data));
    }
  }

  function validation(property_name, string) {
    let isValid = false;
    let errorMessage = '';
    switch (property_name) {
      case 'login': {
          REG_EMAIL.test(string) || REG_PHONE.test(string) ? isValid = true : errorMessage = 'Некорректный логин';
        } break;
      case 'phone': {
          REG_PHONE.test(string) ? isValid = true : errorMessage = 'Некорректный номер телефона';
        } break;
      case 'email': {
          REG_EMAIL.test(string) ? isValid = true : errorMessage = 'Некорректный email';
        } break;
      case 'company': {
          REG_COMPANY.test(string) ? isValid = true : errorMessage = 'Недопустимое имя в поле';
        } break;
      default: {
          REG_KIRILLIC.test(string) ? isValid = true : errorMessage = 'Только латиница';
        }
    } 
    
  
    return {isValid: isValid, errorMessage: errorMessage};
  }

  function clearError(form_id, input_name) {
    let form = document.getElementById(form_id);
    form.elements[input_name].classList.remove('invalid');

    let errorMessage = document.getElementById(input_name + 'ErrorMessage');
    if(errorMessage !== null)
      errorMessage.parentNode.removeChild(errorMessage);
  }

  function clearAllErrors() {
    let errors = document.querySelectorAll('.error-message');
    
    for (let i = 0; i < errors.length; i++) {
      errors[i].parentNode.removeChild(errors[i]);
    }
    
    let invalids = document.querySelectorAll('.invalid');
    for (let i = 0; i < invalids.length; i++) {
      invalids[i].classList.remove('invalid');
    }
  }

