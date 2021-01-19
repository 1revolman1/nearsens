"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTouchDevice = void 0;

// export const carBuyEvent = function () {
//   // .buy-button
//   const event = new CustomEvent('cat', {
//     detail: {
//       state: 'click',
//     },
//   });
//   obj.dispatchEvent(event);
//   setTimeout(() => {
//     const event = new CustomEvent('cat', {
//       detail: {
//         state: 'giveToBackend',
//       },
//     });
//     obj.dispatchEvent(event);
//   }, 2000);
// };
var isTouchDevice = function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

exports.isTouchDevice = isTouchDevice;