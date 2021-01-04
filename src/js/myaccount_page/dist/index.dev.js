"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMyAccountPage = void 0;

var useMyAccountPage = function useMyAccountPage() {
  console.log('My Account Page');
  document.querySelectorAll('.accordion').forEach(function (accordion) {
    // const width = accordion.getBoundingClientRect().width;
    accordion.addEventListener('click', function () {
      this.classList.toggle('active');
      var panel = this.nextElementSibling; //   accordion.style.width = `${width}px`;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }

      panel.classList.toggle('active');
    });
  });
};

exports.useMyAccountPage = useMyAccountPage;