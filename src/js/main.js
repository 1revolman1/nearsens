// import $ from '../local_modules/jquery/dist/jquery.min';
// import'../local_modules/parallax.js-master/parallax';
import { useCasesList } from './usecases_list';
import { useProductList } from './product_list';
import { useProductPage } from './product_page';
import { useCasesDetails } from './usecases_details';
import { useHomePage } from './home_page';
import { useSignUpPage } from './signup_page';
import { useContactPage } from './contact_page';
import { useCartPage } from './cart_page';
import { useHolidayFunc } from './holdayfunctionality';
import { useCheckoutPage } from './checkout_page';
import { useMyAccountPage } from './myaccount_page';
import { usePageGabarit } from './page_gabarit';
import { useSolutionPage } from './solution_page';

$(document).ready(() => {
  function footerJS() {
    if (window.innerWidth <= 768) {
      document
        .querySelectorAll(
          'footer.globalfooter .globalfooter__wrapper__content ul .header'
        )
        .forEach((button, index, buttons) => {
          button.addEventListener('click', function () {
            buttons.forEach(function (btn) {
              const menues = btn.parentNode.classList;
              if (btn.isEqualNode(button)) {
                menues.toggle('open');
                return null;
              }
              if (menues.contains('open')) menues.remove('open');
            });
          });
        });
    }
  }

  function headerJS() {
    const menuList = document.querySelector('.nav-menu ul');
    const menuelm = document.querySelector(
      '.nav-menu ul li:first-of-type .active-link'
    );
    const logo = document.querySelector(
      'header.header .first-block-in-menu > a'
    );
    const target = document.querySelector('header.header');
    if (typeof holiday_event != undefined) useHolidayFunc();
    function onScrollChange(changes, observer) {
      changes.forEach((change) => {
        if (Math.floor(change.intersectionRatio) === 0) {
          const event = new CustomEvent('header', {
            detail: {
              inViewPort: false,
            },
          });
          if (window.innerWidth > 768) {
            logo && logo.classList.add('after-scroll');
            menuList && menuList.classList.add('after-scroll');
          }
          target.dispatchEvent(event);
          menuelm && menuelm.classList.remove('in-viewport');
        } else {
          const event = new CustomEvent('header', {
            detail: {
              inViewPort: true,
            },
          });
          if (window.innerWidth > 768) {
            logo && logo.classList.remove('after-scroll');
            menuList && menuList.classList.remove('after-scroll');
          }
          target.dispatchEvent(event);
          menuelm && menuelm.classList.add('in-viewport');
        }
      });
    }
    const options = {
      root: null, //root
      rootMargin: '0px',
      threshold: 1,
    };
    const observer = new IntersectionObserver(onScrollChange, options);
    if (target) observer.observe(target);
    document
      .querySelectorAll('ul li.dropup, .shop-cart.dropup')
      .forEach(function (dropup, index, elements) {
        dropup.addEventListener('click', function (event) {
          elements.forEach((elem) => {
            if (elem.matches('.activeOpen') && !elem.isEqualNode(dropup))
              elem.classList.remove('activeOpen');
          });
          dropup.classList.toggle('activeOpen');
        });
      });
    document
      .querySelectorAll('ul li.dropup .dropbtn')
      .forEach((button, index, buttons) => {
        button.addEventListener('click', () => {
          buttons.forEach((btn) => {
            if (btn.isEqualNode(button)) return null;
            const classListBTN = btn.parentNode?.querySelector('.dropbtn')
              .classList;
            const classListCONTENT = btn.parentNode?.querySelector(
              '.dropup-content'
            ).classList;
            if (!classListCONTENT.contains('unshow')) {
              classListCONTENT.toggle('unshow');
              classListBTN.toggle('unshow');
            }
          });
          button.parentNode
            ?.querySelector('.dropbtn')
            .classList?.toggle('unshow');
          button.parentNode
            ?.querySelector('.dropup-content')
            .classList?.toggle('unshow');
        });
      });
  }
  headerJS();
  footerJS();

  if (document.querySelectorAll('.custom-block').length > 0) {
    typePage = 'page_gabarit';
  }
  const pageObj = {
    usecase_list: useCasesList,
    product_list_page: useProductList,
    product_page: useProductPage,
    home_page: useHomePage,
    contact_page: useContactPage,
    usecase_details: useCasesDetails,
    signup_page: useSignUpPage,
    cart_page: useCartPage,
    checkout_page: useCheckoutPage,
    my_account: useMyAccountPage,
    page_gabarit: usePageGabarit,
    solution_page: useSolutionPage,
  };
  if (typeof typePage != undefined)
    pageObj[typePage] ? pageObj[typePage]() : console.log(`ELSE PAGE`);
});
