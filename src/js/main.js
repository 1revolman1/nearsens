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
function getBodyScrollTop() {
  return (
    self.pageYOffset ||
    (document.documentElement && document.documentElement.scrollTop) ||
    (document.body && document.body.scrollTop)
  );
}

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
  switch (typeof typePage != undefined) {
    case typePage === 'usecase_list':
      useCasesList();
      break;
    case typePage === 'product_list_page':
      useProductList();
      break;
    case typePage === 'product_page':
      useProductPage();
      break;
    case typePage === 'home_page':
      // console.log(`HOME PAGE`);
      useHomePage();
      break;
    case typePage === 'contact_page':
      // console.log(`HOME PAGE`);
      useContactPage();
      break;
    case typePage === 'usecase_details':
      useCasesDetails();
      break;
    case typePage === 'signup_page':
      useSignUpPage();
    case typePage === 'cart_page':
      useCartPage();
      break;
    default:
      console.log(`ELSE PAGE`);
      break;
  }
  // const page=document.querySelector("body").classList;
  // switch (true) {
  //   case page.contains("about_page"):
  //     console.log(`ABOUT PAGE`);
  //     break;
  //   case page.contains("usecase_list"):
  //     useCasesList()
  //     break;
  //   case page.contains("product_list_page"):
  //     useProductList()
  //     break;
  //   case page.contains("product_page"):
  //     useProductPage()
  //     break;
  //   case page.contains("home_page"):
  //     console.log(`HOME PAGE`);
  //     break;
  //   default:
  //     console.log(`ELSE PAGE`);
  //     break;
  // }
  // const _url = window.location.pathname;
  // switch (true) {
  //   case /about/.test(_url):
  //     console.log(`ABOUT PAGE`);
  //     break;
  //   case /usecase_list/.test(_url):
  //     useCasesList()
  //     break;
  //   case /product_list/.test(_url):
  //     useProductList()
  //     break;
  //   case /product_page/.test(_url):
  //     useProductPage()
  //     break;
  //   case /\//.test(_url):
  //     console.log(`HOME PAGE`);
  //     break;
  //   default:
  //     console.log(`ELSE PAGE`);
  //     break;
  // }
});
