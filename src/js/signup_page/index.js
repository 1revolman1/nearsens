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
      if (!this.classList.contains('selected')) {
        //При выборе 1 элемента - закрыть текущий
        this.parentNode
          .querySelector('.custom-option.selected')
          .classList.remove('selected');
        this.classList.add('selected');
        //Подставить на место заголовка - выбранный элемент
        this.closest('.custom-select').querySelector(
          '.custom-select__trigger span'
        ).textContent = this.textContent;
      }
    });
  }
}

export const useSignUpPage = function () {
  console.log('signup_page');
  selectorFunc();
};
