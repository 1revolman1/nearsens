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

// function intersect(a, b) {
//   if (a.length === 0) {
//     return b;
//   } else if (b.length === 0) {
//     return a;
//   } else return a.filter(Set.prototype.has, new Set(b));
// }
export const useCasesList = function main() {
  console.log(`USECASES LIST PAGE`);
  const FilterFunctionality = {
    _blocks: [
      ...document.querySelectorAll(
        `.use_case__usecases .use_case__usecases-list__element, .use_case__usecases .use_case__usecases-biglist__element`
      ),
    ].map((elm) => {
      return {
        ...elm.dataset,
        elm,
      };
    }),
    _currentFiltersAndValues: {},
    _filters: {},
    _filterAmmount: 0,
    _allBlockContainer: document.querySelectorAll(
      '.use_case__usecases__wrap > *'
    ),
    _ammountOfFilters: {
      head: document.querySelector(
        '.use_case__scrollheader .use_case__scrollheader-content-container__picker h3'
      ),
      doc: document.querySelector('.use_case__usecases h3 span'),
    },
    _placeForFilter: document.querySelector(
      '.use_case__filter__selectedoptions'
    ),

    _flatSingle: (arr) => [].concat(...arr),
    _placeAmmountOfFilter: function (length) {
      this._ammountOfFilters.head.textContent = length
        ? `${length} Filters`
        : 'No filters';
      this._ammountOfFilters.doc.textContent =
        length > 0 ? ` - ${length} filter(s) selected` : '';
    },
    _intersect: function (a, b) {
      if (a.length === 0) {
        return b;
      } else if (b.length === 0) {
        return a;
      } else return a.filter(Set.prototype.has, new Set(b));
    },
    _capitalFirst: function (str) {
      if (!str) return str;
      return str[0].toUpperCase() + str.slice(1);
    },
    _filterFunc: function () {
      const keyArray = Object.keys(this._filters);
      const filterArray = Object.values(this._filters);
      let data = 0;
      this._blocks.forEach(({ elm }) => {
        data += 1;
        elm.classList.add('filtered');
        elm.classList.remove('choosen');
      });
      const filtered = keyArray.reduce((accum, key, index) => {
        return accum.filter(
          (elm) =>
            this._intersect([...elm[key].split(',')], filterArray[index])
              .length > 0
        );
      }, this._blocks);
      console.log(filtered, this._filters);
      this._filterAmmount = this._flatSingle(filterArray).length;
      this._placeAmmountOfFilter(this._filterAmmount);
      filtered.forEach(({ elm }) => {
        elm.classList.add('choosen');
        elm.classList.remove('filtered');
      });
      this._allBlockContainer.forEach((elm) => {
        const generalLength = elm.children.length;
        const filteredLength = elm.querySelectorAll('.filtered').length;
        if (generalLength === filteredLength) {
          elm.classList.add('filtered-parent');
        } else {
          elm.classList.remove('filtered-parent');
        }
      });
    },
    _addToFilter: function (type, selected) {
      this._filters[type] = [...new Set([...this._filters[type], selected])];
      this._filterFunc();
    },
    _removeFromFilter: function (type, selected) {
      this._filters[type] = [
        ...new Set(this._filters[type].filter((elm) => elm !== selected)),
      ];
      this._filterFunc();
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
      const insertBeforeMe = this._placeForFilter.querySelector(
        '.use_case__filter__filtermanipul'
      );
      insertBeforeMe
        ? this._placeForFilter.insertBefore(newDiv, insertBeforeMe)
        : this._placeForFilter.appendChild(newDiv);
      // console.log(this._placeForFilter);
      // this._placeForFilter.insertBefore(newDiv, insertBeforeMe);
    },
    _removeFilterHTML: function (value, type) {
      this._placeForFilter.querySelector(`[data-${type}="${value}"]`).remove();
    },
    _removeAllFilter: function () {
      Object.keys(this._filters).forEach((e) => {
        this._filters[e] = [];
      });
      this._placeAmmountOfFilter(0);
      $('.use_case__filter__selectedoptions__element').remove();
      $('.custom-options .selected').removeClass('selected');
      $('.filtered-parent').removeClass('filtered-parent');
      $('.filtered').removeClass('filtered');
      $('.choosen').removeClass('choosen');
    },
    init: function () {
      const currentFilter = this;
      this._ammountOfFilters.textContent = 'No filters';
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
      const filterKeys = Object.keys(currentFilter._filters);
      currentFilter._blocks.forEach((elm) => {
        filterKeys.forEach((filterKey) => {
          const type = filterKey.toLowerCase();
          currentFilter._currentFiltersAndValues[type] = [
            ...new Set(
              [
                ...(currentFilter._currentFiltersAndValues[type] || []),
                ...elm[type].toLowerCase().split(','),
              ] || []
            ),
          ];
        });
      });
      console.log(currentFilter._currentFiltersAndValues);
      document.querySelectorAll('.custom-option').forEach((option) => {
        const globalDataset = { ...option.dataset };
        const type = globalDataset.name.toLowerCase().split(':')[0];
        const value = globalDataset.value.toLowerCase();
        if (currentFilter._currentFiltersAndValues[type].includes(value)) {
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
            // console.log(currentFilter, currentFilter._filters[type]);
          });
        } else {
          option.style.display = 'none';
        }
      });
      document
        .querySelectorAll('.use_case__filter__filtermanipul button')
        .forEach((e) => {
          e.addEventListener('click', function () {
            currentFilter._removeAllFilter();
          });
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
