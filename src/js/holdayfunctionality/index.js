export const useHolidayFunc = function (logo, menuList, getBodyScrollTop) {
  try {
    window.onscroll = function (event) {
      if (getBodyScrollTop() > 30) {
        logo?.classList?.add('after-scroll');
        menuList?.classList?.add('after-scroll');
      } else {
        logo?.classList?.remove('after-scroll');
        menuList?.classList?.remove('after-scroll');
      }
    };
    document.querySelector('header.header')?.classList.add('holiday-header');
    document.querySelector('nav.nav')?.classList.add('holiday-header');
    document.querySelector('.menu__btn__header')?.classList.add('holiday-btn');
    document.querySelector('menu')?.classList.add('holiday-state');
  } catch (e) {
    console.log(e);
  }
};
