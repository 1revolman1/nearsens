export const useHomePage = function () {
  function Parallax(parallaxContainer) {
    let oneINIT = false;
    // const header = document.querySelector('header.header');
    const textBlock = parallaxContainer.querySelector('.text-container');
    const gadgetBlock = parallaxContainer.querySelector('.gadget');
    const shadowOne = parallaxContainer.querySelector('.shadow-1');
    const shadowThree = parallaxContainer.querySelector('.shadow-3');
    const shadowFour = parallaxContainer.querySelector('.shadow-4');
    const shadowFive = parallaxContainer.querySelector('.shadow-5');
    const LastMountLayer = parallaxContainer.querySelector('.last-mount');
    const MiddleMountLayer = parallaxContainer.querySelector(
      '.middle-mount-layer'
    );
    const PreMiddleMountLayer = parallaxContainer.querySelector(
      '.premiddle-mount-layer'
    );
    // const LastLayer = parallaxContainer.querySelector('.last-mount');
    const FirstMountLayer = parallaxContainer.querySelector(
      '.first-mount-layer'
    );
    oneINIT = true;
    parallaxContainer.classList.add('animated');
    shadowOne.style.bottom = '15%';
    shadowThree.style.bottom = '13%';
    shadowFour.style.bottom = '15%';
    shadowFive.style.bottom = '35%';
    FirstMountLayer.classList.add('anim');
    MiddleMountLayer.classList.add('anim');
    LastMountLayer.classList.add('anim');
    // PreMiddleMountLayer.classList.add('anim');
    // FirstMountLayer.style.transform = 'scale(1.21) translate(40px,26px)';
    setTimeout(() => {
      textBlock.style.top = '15%';
      gadgetBlock.classList.add('anim');
      // gadgetBlock.style.bottom = '27%';
      document
        .querySelector('.index-page-container')
        .classList.add('transform-block');
      document
        .querySelector('.index__parallax__text')
        .classList.add('transform-block');
    }, 1000);
    // }
    // });
  }
  function Video() {
    console.log('VIDEO');
    const video = document.querySelector('div#player-container video');
    // alert(video);
    // console.log(video, video.paused);
    // setTimeout(() => {
    //   console.log('2', video, video.paused);
    //   video.pause();
    // }, 5000);
    if (video !== null && typeof video !== 'undefined') {
      video.pause();
      function onScrollChange(changes, observer) {
        changes.forEach((change) => {
          if (change.intersectionRatio === 0) {
            video.pause();
            // if (video.paused) alert('PAUSED');
          } else {
            video.play();
            // if (!video.paused) alert('NOT PAUSED');
          }
        });
      }
      const options = {
        root: null, //root
        rootMargin: '0%',
        threshold: 0,
      };
      const observer = new IntersectionObserver(onScrollChange, options);
      const target = document.querySelector('.index__youtubeframe');
      if (target) observer.observe(target);
    }
  }
  function OtherPage() {
    console.log('LOAD OTHER PAGE');
    if (!window.innerWidth > 768) {
      const elements = document.querySelectorAll(
        '.index__morewithless__blockwithhover__element'
      );
      elements.forEach((elm) => {
        elm.classList.add('mobile-page');
      });
    }
    document
      .querySelector('.index__createsolution__wrap__discover')
      .addEventListener('click', () => {
        document
          .querySelector('.index__youtubeframe')
          .scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    Video();
  }

  document.querySelector('.index-page-container').style.opacity = 1;

  const parallaxContainer = document.querySelector('.index__parallax');
  if (parallaxContainer)
    parallaxContainer.addEventListener('parallax', function (event) {
      switch (event.detail.state) {
        case 'loaded img':
          Parallax(parallaxContainer);
          break;
        case 'load other script':
          OtherPage();
          break;
        default:
          console.log(`ELSE`);
          break;
      }
    });
  const imageObject = {
    images: document.querySelectorAll('.index__parallax #scene img'),
    countOfLoadedImages: 0,
    get ammount() {
      return this.images.length;
    },
    set setCount(x) {
      this.countOfLoadedImages = x;
    },
    init: function () {
      this.images.forEach((logo) => {
        if (logo.complete) {
          this.countOfLoadedImages = this.countOfLoadedImages + 1;
        } else {
          logo.addEventListener('load', () => {
            this.countOfLoadedImages = this.countOfLoadedImages + 1;
            if (this.countOfLoadedImages === this.images.length) {
              //animation start when all pictures loaded
              // Parallax(parallaxContainer);
              parallaxContainer.dispatchEvent(
                new CustomEvent('parallax', {
                  detail: { state: 'loaded img' },
                })
              );
            }
          });
        }
        if (this.countOfLoadedImages === this.images.length) {
          //animation start when all pictures loaded
          // Parallax(parallaxContainer);
          parallaxContainer.dispatchEvent(
            new CustomEvent('parallax', {
              detail: { state: 'loaded img' },
            })
          );
        }
      });
    },
  };
  if (window.innerWidth > 768) {
    // Parallax(parallaxContainer);
    imageObject.init();
  }
  // else {
  // const elements = document.querySelectorAll(
  //   '.index__morewithless__blockwithhover__element'
  // );
  // elements.forEach((elm) => {
  //   elm.classList.add('mobile-page');
  // });
  // }
  // if (typeof development === 'boolean' && development) {
  //   OtherPage();
  // }
  OtherPage();
  // anime({
  //   targets: '.moving-layer',
  //   translateX: {
  //     value: '*=2.5', // 100px * 2.5 = '250px'
  //     duration: 1000,
  //     easing: 'easeInOutSine',
  //   },
  //   scale: function (el, i, l) {
  //     return l - i + 0.25;
  //   },
  //   // width: {
  //   //   value: '-=20px', // 28 - 20 = '8px'
  //   //   duration: 1800,
  //   //   easing: 'easeInOutSine',
  //   // },
  //   // rotate: {
  //   //   value: '+=2turn', // 0 + 2 = '2turn'
  //   //   duration: 1800,
  //   //   easing: 'easeInOutSine',
  //   // },
  //   direction: 'alternate',
  // });
};
