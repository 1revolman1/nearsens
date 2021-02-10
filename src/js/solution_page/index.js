export const useSolutionPage = function () {
  console.log('Solution Page');
  document
    .querySelectorAll(
      'section.solutionpage__imggrid .solutionpage__imggrid__grid__img'
    )
    .forEach((block) => {
      console.log('TEST');
      block.addEventListener('click', function () {
        block.classList.toggle('active');
      });
    });
};
