export const usePageGabarit = function main() {
  console.log('PAGE GABARIT');
  document
    .querySelectorAll('section.page_gabarit__fourblocks')
    .forEach(function (container) {
      container.setAttribute(
        'data-ammount',
        container.querySelectorAll('.page_gabarit__fourblocks__wrap__elemenet')
          .length
      );
    });
};
