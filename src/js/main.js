// import $ from '../local_modules/jquery/dist/jquery.min';
import {useCasesList} from "./usecases_list";
import {useProductList} from "./product_list";
import {useProductPage} from "./product_page";

$(document).ready(() => {
  
  switch (true) {
    case typePage==="about_page":
      console.log(`ABOUT PAGE`);
      break;
    case typePage==="usecase_list":
      useCasesList()
      break;
    case typePage==="product_list_page":
      useProductList()
      break;
    case typePage==="product_page":
      useProductPage()
      break;
    case typePage==="home_page":
      console.log(`HOME PAGE`);
      break;
    case typePage==="usecase_details":
      console.log(`USE CASE DETAILS`);
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
  // document.querySelector("html").scrollTop
  function headerJS() {
    document.querySelectorAll("ul li.dropup .dropbtn").forEach((button) => {
      button.addEventListener("click", function () {
        button.parentNode?.querySelector(".dropbtn").classList?.toggle("unshow");
        button.parentNode?.querySelector(".dropup-content").classList?.toggle("unshow");
        // button?.parentElement?.childNodes[1].firstChild.classList.toggle("unshow")
        // button?.parentElement?.childNodes[0].classList.toggle("unshow")
      })
    })
  }
  headerJS();
});
