export const usePageGabarit = function main() {
  console.log('PAGE GABARIT');
  //add class for page gabarit
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
};
