export const useCheckoutPage = () => {
  console.log('CHECKOUT');
  document
    .querySelectorAll('.checkout_page__content__contact__manip__chekedbox__box')
    .forEach((elm) => {
      elm.addEventListener('change', function (e) {
        this.classList.toggle('checked');
      });
    });
};
