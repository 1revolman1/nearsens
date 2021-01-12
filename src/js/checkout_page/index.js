export const useCheckoutPage = () => {
  function openOne(cls, remove = false) {
    document.querySelectorAll(cls).forEach(function (elm) {
      elm.addEventListener('change', function (e) {
        this.parentNode.classList.toggle('checked');
        document.querySelectorAll(cls).forEach((other) => {
          if (this !== other) {
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
  function accordionMaxHeight() {
    const padding = 10;
    const arrayOfElement = [
      ...document.querySelectorAll('.checkout_page__products__element'),
    ].splice(0, 5);
    const maxHeightWithoutGap = arrayOfElement.reduce(function (
      accumulator,
      currentValue
    ) {
      return currentValue.offsetHeight + accumulator;
    },
    0);
    const maxHeight =
      maxHeightWithoutGap + (arrayOfElement.length * 20 - 20) + padding;
    return maxHeight;
  }
  const maxHeight = accordionMaxHeight();
  console.log(maxHeight);
  //new product page layout concept
  (function accoridon(isMobile) {
    const accordContainer = document.querySelector('.checkout_page__products');
    const panel = accordContainer.querySelector('.panel');
    const accordBtn = accordContainer.querySelector('.accordion');
    const isMoreThan5 =
      document.querySelectorAll(
        '.checkout_page__products .checkout_page__products__element'
      ).length > 5;
    panel.setAttribute('data-biglist', isMoreThan5);
    if (!isMobile) {
      panel.classList.add('active');
      accordBtn.classList.add('active');

      console.log(!isMoreThan5);
      if (panel.classList.contains('active')) {
        panel.style.maxHeight = maxHeight + 'px';
      } else {
        panel.style.maxHeight = '0px';
      }
    }
    document.querySelectorAll('.accordion').forEach((accordion) => {
      accordion.addEventListener('click', function () {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        panel.classList.toggle('active');

        console.log(!isMoreThan5);
        if (panel.classList.contains('active')) {
          panel.style.maxHeight = maxHeight + 'px';
        } else {
          panel.style.maxHeight = '0px';
        }
        // if (panel.style.maxHeight) {
        //   panel.classList.remove('active');
        //   // panel.style.maxHeight = null;
        // } else {
        //   panel.classList.add('active');
        //   // panel.style.maxHeight = panel.scrollHeight + 'px';
        // }
      });
    });
  })(window.innerWidth <= 768);

  //new custom payment methods
  document
    .querySelectorAll(
      '.checkout_page__content__contact__manip__payMethod .input-radio'
    )
    .forEach(function (elm) {
      if (elm.checked) elm.parentNode.classList.add('checked');
    });
};
