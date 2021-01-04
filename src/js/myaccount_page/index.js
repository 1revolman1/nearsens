export const useMyAccountPage = function () {
  console.log('My Account Page');
  document.querySelectorAll('.accordion').forEach((accordion) => {
    // const width = accordion.getBoundingClientRect().width;
    accordion.addEventListener('click', function () {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;
      //   accordion.style.width = `${width}px`;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
      panel.classList.toggle('active');
    });
  });
};
