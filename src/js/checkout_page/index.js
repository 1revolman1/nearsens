export const useCheckoutPage = () => {
  function openOne(cls, remove = false) {
    document.querySelectorAll(cls).forEach(function (elm) {
      elm.addEventListener('change', function (e) {
        document.querySelectorAll(cls).forEach((other) => {
          if (this !== other && other.checked) {
            other.checked = false;
            if (remove) other.closest('label').classList.remove('checked');
          }
        });
      });
    });
  }
  document.querySelectorAll('label').forEach((elm) => {
    elm.addEventListener('change', function (e) {
      this.classList.toggle('checked');
    });
  });

  //Contact page
  openOne('.checkout_page__checkbox input', true);
  //Main service
  openOne(
    '.checkout_page__content__contact__manip__chekedbox__box input',
    true
  );
  //Bill page
  openOne(
    '.checkout_page__content__contact__manip__payMethod__elm input',
    true
  );
};
