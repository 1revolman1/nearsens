"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSolutionPage = void 0;

var useSolutionPage = function useSolutionPage() {
  console.log('Solution Page');
  document.querySelectorAll('section.solutionpage__imggrid .solutionpage__imggrid__grid__img').forEach(function (block) {
    console.log('TEST');
    block.addEventListener('click', function () {
      block.classList.toggle('active');
    });
  });
};

exports.useSolutionPage = useSolutionPage;