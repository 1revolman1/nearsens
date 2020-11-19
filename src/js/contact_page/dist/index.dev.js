"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useContactPage = void 0;

var useContactPage = function useContactPage() {
  console.log("CONTACT PAGE");
  var acc = document.querySelectorAll(".accordion");
  acc.forEach(function (elm) {
    console.log(elm);
    elm.addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
};

exports.useContactPage = useContactPage;