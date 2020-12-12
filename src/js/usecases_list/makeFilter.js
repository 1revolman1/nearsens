function intersect(a, b) {
  if (a.length === 0) {
    return b;
  } else if (b.length === 0) {
    return a;
  } else return a.filter(Set.prototype.has, new Set(b));
}
// для обьектов - https://qastack.ru/programming/1885557/simplest-code-for-array-intersection-in-javascript
// const intersect = (arr1, arr2, accessors = [(v) => v, (v) => v]) => {
//   const [fn1, fn2] = accessors;
//   const set = new Set(arr2.map((v) => fn2(v)));
//   return arr1.filter((value) => set.has(fn1(value)));
// };

let data = [
  {
    type: 'toyota,jeep',
    product: '10',
  },
  {
    type: 'toyota',
    product: '20',
  },
  {
    type: 'jeep',
    product: '20',
  },
  {
    type: 'mitsubisi',
    product: '620',
  },
  {
    type: 'Mila',
    product: '230',
  },
];
let find = {
  type: ['mitsubisi', 'toyota'],
  product: [],
};

let keyArray = Object.keys(find);
let filterArray = Object.values(find);
// keyArray.forEach((key, index) => {
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
let answer = [];
keyArray.forEach((key, index) => {
  //   console.log(
  //     data.filter(
  //       (elm) =>
  //         intersect([...elm[key].split(',')], filterArray[index]).length > 0
  //     )
  //   );
  answer = [
    ...answer,
    ...data.filter(
      (elm) =>
        intersect([...elm[key].split(',')], filterArray[index]).length > 0
    ),
  ];
});

// [1, 2, 3].reduce((accum, elm, index) => {
//   console.log(accum);
//   accum = [...accum, elm + 1];
//   return accum;
// }, []);

keyArray.reduce((accum, key, index) => {
  accum = [
    ...accum,
    ...data.filter(
      (elm) =>
        intersect([...elm[key].split(',')], filterArray[index]).length > 0
    ),
  ];
  return accum;
}, []);

// ПРАВИЛЬНО
keyArray.reduce((accum, key, index) => {
  return accum.filter(
    (elm) => intersect([...elm[key].split(',')], filterArray[index]).length > 0
  );
}, data);
console.log(
  keyArray.reduce((accum, key, index) => {
    console.log(filterArray[index]);
    return accum.filter(
      (elm) =>
        intersect([...elm[key].split(',')], filterArray[index]).length > 0
    );
  }, data)
);
