"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useContactPage = void 0;

var useContactPage = function useContactPage() {
  // const header=document.querySelector("header.header");
  // const sticky=document.querySelector(".loginpage__sticky")
  console.log('CONTACT PAGE');
  var acc = document.querySelectorAll('.accordion');
  acc.forEach(function (elm) {
    elm.addEventListener('click', function () {
      this.classList.toggle('active');
      var panel = this.nextElementSibling;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
  var hidden = document.querySelector('.contact__findanswer__wrap__secondinit');
  var btnContainer = document.querySelector('.contact__findanswer__wrap__firstinit');
  document.querySelector('.contact__findanswer__wrap__btn').addEventListener('click', function (elm) {
    // console.log(elm)
    btnContainer.classList.add('unshow');
    hidden.classList.add('show');
  }); // header.addEventListener("header",function({detail:{inViewPort}}){
  //   // console.log("FUNC",inViewPort);
  //   if(!inViewPort){
  //     sticky.classList.add("sticky-state")
  //   }else{
  //     sticky.classList.remove("sticky-state")
  //   }
  // })
};

exports.useContactPage = useContactPage;