export const useCheckoutPage = () => {
  function openOne(cls, remove = false) {
    document.querySelectorAll(cls).forEach(function (elm) {
      elm.addEventListener('change', function (e) {
        this.parentNode.classList.toggle('checked');
        document.querySelectorAll(cls).forEach((other) => {
          if (this !== other && other.checked) {
            other.checked = false;
            if (remove) other.closest('label').classList.remove('checked');
          }
        });
      });
    });
  }
  // document.querySelectorAll('label').forEach((elm) => {
  //   elm.addEventListener('change', function (e) {
  //     this.classList.toggle('checked');
  //   });
  // });

  //Contact page
  openOne('.checkout_page__checkbox input', true);
  //Main service
  openOne(
    '.checkout_page__content__contact__manip__chekedbox__box input',
    true
  );
  //Pament methods
  openOne(
    '.checkout_page__content__contact__manip__payMethod__elm input',
    true
  );
  //Bill checkc
  openOne(
    '.checkout_page__content__contact__manip__chekedboxAccept input',
    true
  );
  // $('.ui.dropdown').dropdown({
  //   clearable: true,
  // });
  document.querySelectorAll('.accordion').forEach((accordion) => {
    accordion.addEventListener('click', function () {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;
      panel.classList.toggle('active');
      // if (panel.style.maxHeight) {
      //   panel.classList.remove('active');
      //   // panel.style.maxHeight = null;
      // } else {
      //   panel.classList.add('active');
      //   // panel.style.maxHeight = panel.scrollHeight + 'px';
      // }
    });
  });
};
