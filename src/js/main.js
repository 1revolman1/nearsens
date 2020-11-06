// import $ from '../local_modules/jquery/dist/jquery.min';
import {useCasesList} from "./usecases_list";
import {useProductList} from "./product_list";
import {useProductPage} from "./product_page";

$(document).ready(() => {
  const _url = window.location.pathname;
  switch (true) {
    case /about/.test(_url):
      console.log(`ABOUT PAGE`);
      break;
    case /usecase_list/.test(_url):
      useCasesList()
      break;
    case /product_list/.test(_url):
      useProductList()
      break;
    case /product_page/.test(_url):
      useProductPage()
      break;
    case /\//.test(_url):
      console.log(`HOME PAGE`);
      break;
    default:
      console.log(`ELSE PAGE`);
      break;
  }
  // document.querySelector("html").scrollTop
  function headerJS() {
    document.querySelectorAll("ul li.dropup .dropbtn").forEach((button) => {
      button.addEventListener("click", function (event) {
        console.log("CLICKED", button?.parentElement?.childNodes[0])
        button?.parentElement?.childNodes[1].firstChild.classList.toggle("unshow")
        button?.parentElement?.childNodes[0].classList.toggle("unshow")
      })
    })
  }
  headerJS();
});
