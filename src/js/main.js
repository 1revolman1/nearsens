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
  [1, 2, 3].map((e) => e ** 2);
});
