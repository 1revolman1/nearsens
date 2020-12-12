"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function intersect(a, b) {
  if (a.length === 0) {
    return b;
  } else if (b.length === 0) {
    return a;
  } else return a.filter(Set.prototype.has, new Set(b));
} // для обьектов - https://qastack.ru/programming/1885557/simplest-code-for-array-intersection-in-javascript
// const intersect = (arr1, arr2, accessors = [(v) => v, (v) => v]) => {
//   const [fn1, fn2] = accessors;
//   const set = new Set(arr2.map((v) => fn2(v)));
//   return arr1.filter((value) => set.has(fn1(value)));
// };


var data = [{
  type: 'toyota,jeep',
  product: '10'
}, {
  type: 'toyota',
  product: '20'
}, {
  type: 'jeep',
  product: '20'
}, {
  type: 'mitsubisi',
  product: '620'
}, {
  type: 'Mila',
  product: '230'
}];
var find = {
  type: ['mitsubisi', 'toyota'],
  product: []
};
var keyArray = Object.keys(find);
var filterArray = Object.values(find); // keyArray.forEach((key, index) => {
//   data.filter((elm) => elm.includes(filterArray[index]));
// });
// keyArray.forEach((key, index) => {
//   console.log(
//     data.filter(
//       (elm) =>
//         intersect([...elm[key].split(',')], filterArray[index]).length > 0
//     )
//   );
// });

var answer = [];
keyArray.forEach(function (key, index) {
  //   console.log(
  //     data.filter(
  //       (elm) =>
  //         intersect([...elm[key].split(',')], filterArray[index]).length > 0
  //     )
  //   );
  answer = [].concat(_toConsumableArray(answer), _toConsumableArray(data.filter(function (elm) {
    return intersect(_toConsumableArray(elm[key].split(',')), filterArray[index]).length > 0;
  })));
}); // [1, 2, 3].reduce((accum, elm, index) => {
//   console.log(accum);
//   accum = [...accum, elm + 1];
//   return accum;
// }, []);

keyArray.reduce(function (accum, key, index) {
  accum = [].concat(_toConsumableArray(accum), _toConsumableArray(data.filter(function (elm) {
    return intersect(_toConsumableArray(elm[key].split(',')), filterArray[index]).length > 0;
  })));
  return accum;
}, []); // ПРАВИЛЬНО

keyArray.reduce(function (accum, key, index) {
  return accum.filter(function (elm) {
    return intersect(_toConsumableArray(elm[key].split(',')), filterArray[index]).length > 0;
  });
}, data);
console.log(keyArray.reduce(function (accum, key, index) {
  console.log(filterArray[index]);
  return accum.filter(function (elm) {
    return intersect(_toConsumableArray(elm[key].split(',')), filterArray[index]).length > 0;
  });
}, data));