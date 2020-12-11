// function selectorFunc() {
//   for (const dropdown of document.querySelectorAll('.custom-select-wrapper')) {
//     // const widthDropdownBlock=dropdown?.querySelector(".custom-options")?.getBoundingClientRect()?.width
//     // dropdown.setAttribute("data-size",widthDropdownBlock);
//     // dropdown.style.width=`${dropdown.getBoundingClientRect().width}px`
//     // const initialWidth=dropdown.getBoundingClientRect()?.width
//     dropdown.addEventListener('click', function () {
//       const listOfAll = document.querySelectorAll(
//         '.custom-select-wrapper.open'
//       );
//       if (listOfAll.length > 0 && !dropdown.classList.contains('open'))
//         listOfAll.forEach((opened) => opened.classList.toggle('open'));
//       this.classList.toggle('open');
//       // if(dropdown.classList.contains("open"))
//       //     dropdown.style.width=`${this.dataset.size}px`;
//       // else dropdown.style.width=`${initialWidth}px`;
//       // this.querySelector('.custom-select').classList.toggle('open');
//     });
//   }
//   window.addEventListener('click', function (e) {
//     for (const select of document.querySelectorAll(
//       '.custom-select-wrapper.open'
//     )) {
//       if (!select.contains(e.target)) {
//         select.classList.remove('open');
//       }
//     }
//   });

//   for (const option of document.querySelectorAll('.custom-option')) {
//     option.addEventListener('click', function (event) {
//       event.stopPropagation();
//       if (!this.classList.contains('selected')) {
//         //При выборе 1 элемента - закрыть текущий
//         // this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
//         this.classList.add('selected');
//         //Подставить на место заголовка - выбранный элемент
//         // this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
//       } else {
//         this.classList.remove('selected');
//       }
//     });
//   }
// }

export const useCasesList = function main() {
  console.log(`USECASES LIST PAGE`);
  const FilterFunctionality = {
    _filters: {},
    _placeForFilter: document.querySelector(
      '.use_case__filter__selectedoptions'
    ),
    _capitalFirst: function (str) {
      if (!str) return str;
      return str[0].toUpperCase() + str.slice(1);
    },
    _addToFilter: function (type, selected) {
      this._filters[type] = [...new Set([...this._filters[type], selected])];
      //ФИЛЬТР И
      [
        ...document.querySelectorAll(
          `.use_case__usecases [data-${type}]:not(.filtered)`
        ),
      ].forEach((e) => {
        if (!e.dataset[type].split(',').includes(selected)) {
          $(e).hide('fade');
        } else {
          $(e).show('fade');
          e.classList.add('filtered');
        }
      });
      return this._filters;
    },
    _removeFromFilter: function (type, selected) {
      this._filters[type] = [
        ...new Set(this._filters[type].filter((elm) => elm !== selected)),
      ];
      [
        ...document.querySelectorAll(
          `.use_case__usecases [data-${type}].filtered`
        ),
      ]
        .filter((e) => e.dataset[type].split(',').includes(selected))
        .forEach((e) => {
          console.log(
            e,
            e.dataset,
            this._filters[type],
            e.dataset[type].split(',')
          );
          if (this._filters[type].length > 0) {
            if (
              !e.dataset[type]
                .split(',')
                .some((r) => this._filters[type].includes(r))
            ) {
              $(e).hide('fade');
              e.classList.remove('filtered');
            }
          } else {
            $(`[data-${type}]`).removeClass('filtered').show('fade');
          }
        });
      return selected;
    },
    _createFilterHTML: function (value, type, selector, name) {
      const currentFilter = this;
      const newDiv = document.createElement('div');
      const listener = function () {
        selector.classList.remove('selected');
        newDiv.removeEventListener('click', listener);
        currentFilter._removeFromFilter(type, value);
        this.remove();
      };
      newDiv.setAttribute(`data-${type}`, value);
      newDiv.classList.add('use_case__filter__selectedoptions__element');
      newDiv.innerHTML = `<span>${this._capitalFirst(
        type
      )} : ${this._capitalFirst(name)} <i class="fas fa-times"></i></span>`;
      newDiv.addEventListener('click', listener);
      this._placeForFilter.appendChild(newDiv);
    },
    _removeFilterHTML: function (value, type) {
      this._removeFromFilter(type, value);
      this._placeForFilter.querySelector(`[data-${type}="${value}"]`).remove();
    },
    _removeAllFilter: function () {
      Object.keys(this._filters).forEach((e) => {
        this._filters[e] = [];
      });
      $('.use_case__usecases-list__element').show('fast');
      $('.use_case__filter__selectedoptions__element').remove();
      $('.custom-options .selected').removeClass('selected');
      $('.filtered').removeClass('filtered');
    },
    init: function () {
      const currentFilter = this;
      document
        .querySelectorAll('.custom-select-wrapper')
        .forEach((dropdown) => {
          currentFilter._filters[dropdown.dataset?.type] = [];
          dropdown.addEventListener('click', function () {
            const listOfAll = document.querySelectorAll(
              '.custom-select-wrapper.open'
            );
            if (listOfAll.length > 0 && !dropdown.classList.contains('open'))
              listOfAll.forEach((opened) => opened.classList.toggle('open'));
            this.classList.toggle('open');
          });
        });
      window.addEventListener('click', function (e) {
        document
          .querySelectorAll('.custom-select-wrapper.open')
          .forEach((select) => {
            if (!select.contains(e.target)) {
              select.classList.remove('open');
            }
          });
      });

      document.querySelectorAll('.custom-option').forEach((option) =>
        option.addEventListener('click', function (event) {
          event.stopPropagation();
          const type = this.closest('.custom-select-wrapper').dataset?.type;
          const selected = this.dataset?.value;
          const name = this.dataset?.name.split(':')[1];
          if (!this.classList.contains('selected')) {
            currentFilter._addToFilter(type, selected);
            currentFilter._createFilterHTML(selected, type, this, name);
            //ФИЛЬТР ИЛИ
            // [...document.querySelectorAll(`[data-${type}]`)]
            //   .filter((e) => !e.dataset[type].split(',').includes(selected))
            //   .forEach((e) => {
            //     $(e).hide('fade');
            //     e.classList.add('filtered');
            //   });
            this.classList.add('selected');
          } else {
            currentFilter._removeFromFilter(type, selected);
            currentFilter._removeFilterHTML(selected, type);
            //ФИЛЬТР ИЛИ
            // [...document.querySelectorAll(`[data-${type}]`)]
            //   .filter((e) => !e.dataset[type].split(',').includes(selected))
            //   .forEach((e) => {
            //     $(e).show('fade');
            //     e.classList.remove('filtered');
            //   });
            // УБРАТЬ ФИЛЬТР
            this.classList.remove('selected');
          }
          console.log(currentFilter, currentFilter._filters[type]);
        })
      );
      document
        .querySelector('.use_case__filter__filtermanipul button')
        .addEventListener('click', function () {
          currentFilter._removeAllFilter();
        });
    },
  };
  FilterFunctionality.init();
  //   selectorFunc();
  const scrollable = document.querySelector('section.use_case__scrollheader');
  const scrollToThisBlock = document.querySelector('.use_case__filter');
  function onScrollChange(changes, observer) {
    changes.forEach((change) => {
      if (change.intersectionRatio === 0) {
        scrollable.classList.add('out-viewport');
        scrollable.style.opacity = '1';
        scrollable.style.visibility = 'visible';

        console.log('Header is outside viewport');
      } else {
        scrollable.classList.remove('out-viewport');
        // scrollable.style.display="none";
        scrollable.style.opacity = '0';
        scrollable.style.visibility = 'hidden';
        console.log('Header is IN THE viewport');
      }
    });
  }
  const options = {
    root: null, //root
    rootMargin: '-100px',
    threshold: 0,
  };
  document
    .querySelector('.use_case__scrollheader-content-container__picker')
    ?.addEventListener('click', function (event) {
      scrollToThisBlock.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });

  const observer = new IntersectionObserver(onScrollChange, options);
  const target = document.querySelector('section.use_case__pageheader');
  if (target) observer.observe(target);
};
