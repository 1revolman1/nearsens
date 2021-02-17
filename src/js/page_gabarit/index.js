import { debounce } from '../additionfunctional/cartbuy';

function headermoreover() {
  document
    .querySelectorAll('.page_gabarit__headermoreover')
    .forEach(function (elem) {
      const selected = elem.querySelector(
        '.page_gabarit__headermoreover__elem.selected'
      );
      const wrapper = elem.querySelector(
        '.page_gabarit__headermoreover__wrap.main'
      );
      const allHegiht = [
        ...elem.querySelectorAll('.page_gabarit__headermoreover__elem'),
      ].map((tipsElem) => tipsElem.getBoundingClientRect().height, 0);

      const allMaxHeight =
        allHegiht.reduce((accumulator, current) => accumulator + current) +
        (allHegiht.length - 1) * 3;
      const selectedHeight = selected.getBoundingClientRect().height;
      wrapper.style.cssText = `
      max-height: ${selectedHeight}px;
    `;
      selected.onclick = (event) => {
        event.preventDefault();
        if (wrapper.classList.contains('close')) {
          wrapper.style.cssText = `
            max-height: ${allMaxHeight}px;
          `;
        } else {
          wrapper.style.cssText = `
            max-height: ${selectedHeight}px;
          `;
        }
        wrapper.classList.toggle('close');
      };
    });
}

export const usePageGabarit = function main() {
  console.log('PAGE GABARIT');
  if (document.querySelectorAll('.custom-block').length > 0)
    document.querySelector('main').classList.add('custom-page');
  document
    .querySelectorAll('section.page_gabarit__fourblocks')
    .forEach(function (container) {
      container.setAttribute(
        'data-ammount',
        container.querySelectorAll('.page_gabarit__fourblocks__wrap__elemenet')
          .length
      );
    });

  headermoreover();
  window.addEventListener(
    'resize',
    debounce(function (event) {
      console.log('RESIZE');
      headermoreover();
    }, 200)
  );
};
