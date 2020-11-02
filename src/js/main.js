import $ from '../local_modules/jquery/dist/jquery.min';

$(document).ready(() => {
  const _url = window.location.pathname;
  switch (true) {
    case /about/.test(_url):
      console.log(`ABOUT PAGE`);
      break;
    case /\//.test(_url):
      console.log(`HOME PAGE`);
      break;
    default:
      console.log(`ELSE PAGE`);
      break;
  }

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
