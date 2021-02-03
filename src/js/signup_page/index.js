function selectorFunc() {
  for (const dropdown of document.querySelectorAll('.custom-select-wrapper')) {
    dropdown.addEventListener('click', function () {
      const listOfAll = document.querySelectorAll(
        '.custom-select-wrapper.open'
      );
      if (listOfAll.length > 0 && !dropdown.classList.contains('open'))
        listOfAll.forEach((opened) => opened.classList.toggle('open'));
      this.classList.toggle('open');
    });
  }
  window.addEventListener('click', function (e) {
    for (const select of document.querySelectorAll(
      '.custom-select-wrapper.open'
    )) {
      if (!select.contains(e.target)) {
        select.classList.remove('open');
      }
    }
  });

  for (const option of document.querySelectorAll('.custom-option')) {
    option.addEventListener('click', function (event) {
      event.stopPropagation();
      const inputHiddenValue = this.closest(
        '.loginpage__container__block__manipulator'
      ).querySelector("input[type='hidden'][name='country']");
      if (!this.classList.contains('selected')) {
        //При выборе 1 элемента - закрыть текущий
        const countryTag = this.getAttribute('data-value');
        this.parentElement
          .querySelectorAll('.custom-option.selected')
          .forEach((elm) => {
            inputHiddenValue.value = '';
            elm.classList.remove('selected');
          });
        // .classList.remove('selected');
        this.classList.add('selected');
        inputHiddenValue.value = countryTag;
        //Подставить на место заголовка - выбранный элемент
        this.closest('.custom-select').querySelector(
          '.custom-select__trigger span'
        ).textContent = this.textContent;
        this.closest('.custom-select-wrapper').classList.remove('open');
      }
    });
  }
}
function checkIfNotValid() {
  const scrollToThis = document.querySelector('.signuppage__container h2');
  const inputs = {
    username: {
      selector:
        ".loginpage__container__block__manipulator input[name='username']",
      func: function ValidateName(name) {
        return /^([\d\w]{2,})$/.test(name);
      },
    },
    email: {
      selector: ".loginpage__container__block__manipulator input[name='email']",
      func: function ValidateEmail(mail) {
        return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
          mail
        );
      },
    },
    password: {
      selector:
        ".loginpage__container__block__manipulator input[name='password']",
      func: function ValidatePassword(password) {
        return /^([\d\w]{4,})$/.test(password);
      },
    },
  };
  let finalString = Object.keys(inputs)
    .map(function (elm) {
      return inputs[elm].selector;
    })
    .join(',');
  const ourInputs = [...document.querySelectorAll(finalString)];
  let functionalArray = ourInputs.map(function (elm) {
    return inputs[elm.getAttribute('name')].func;
  });
  //Make blur event on input
  ourInputs.forEach(function (elm, index) {
    elm.addEventListener('blur', function () {
      if (functionalArray[index](String(elm.value))) {
        elm.classList.remove('error-input');
      } else {
        elm.classList.add('error-input');
      }
    });
  });
  //Make click event on btn

  document
    .querySelector(".signuppage__container__block__email button[type='submit']")
    .addEventListener('click', function (event) {
      event.preventDefault();
      const erroredElements = ourInputs.filter(
        (elm, index) => !functionalArray[index](String(elm.value))
      );
      erroredElements.forEach(function (elm) {
        elm.classList.add('error-input');
        const listener = function () {
          elm.classList.remove('error-input');
          elm.oninput = null;
        };
        elm.oninput = listener;
      });
      if (erroredElements.length > 0) {
        setTimeout(() => {
          scrollToThis.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }, 200);
      }
    });
}

export const useSignUpPage = function () {
  console.log('signup_page');
  selectorFunc();
  checkIfNotValid();
};
