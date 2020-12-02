"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHomePage = void 0;

var useHomePage = function useHomePage() {
  function Parallax(parallaxContainer) {
    var oneINIT = false; // const header = document.querySelector('header.header');

    var textBlock = parallaxContainer.querySelector('.text-container');
    var gadgetBlock = parallaxContainer.querySelector('.gadget');
    var shadowOne = parallaxContainer.querySelector('.shadow-1');
    var shadowThree = parallaxContainer.querySelector('.shadow-3');
    var shadowFour = parallaxContainer.querySelector('.shadow-4');
    var shadowFive = parallaxContainer.querySelector('.shadow-5');
    var LastMountLayer = parallaxContainer.querySelector('.last-mount');
    var MiddleMountLayer = parallaxContainer.querySelector('.middle-mount-layer'); // const LastLayer = parallaxContainer.querySelector('.last-mount');

    var FirstMountLayer = parallaxContainer.querySelector('.first-mount-layer');
    oneINIT = true;
    shadowOne.style.bottom = '15%';
    shadowThree.style.bottom = '13%';
    shadowFour.style.bottom = '15%';
    shadowFive.style.bottom = '35%';
    FirstMountLayer.classList.add('anim');
    MiddleMountLayer.classList.add('anim');
    LastMountLayer.classList.add('anim'); // FirstMountLayer.style.transform = 'scale(1.21) translate(40px,26px)';

    setTimeout(function () {
      textBlock.style.top = '15%';
      gadgetBlock.classList.add('anim'); // gadgetBlock.style.bottom = '27%';

      document.querySelector('.index-page-container').classList.add('transform-block');
      document.querySelector('.index__parallax__text').classList.add('transform-block');
    }, 1000); // }
    // });
  }

  var parallaxContainer = document.querySelector('.index__parallax');
  document.querySelector('.index__createsolution__wrap__discover').addEventListener('click', function () {
    document.querySelector('.index__youtubeframe').scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    });
  });
  var imageObject = {
    images: document.querySelectorAll('.index__parallax #scene img'),
    countOfLoadedImages: 0,

    get ammount() {
      return this.images.length;
    },

    set setCount(x) {
      this.countOfLoadedImages = x;
    },

    init: function init() {
      var _this = this;

      this.images.forEach(function (logo) {
        if (logo.complete) {
          _this.countOfLoadedImages = _this.countOfLoadedImages + 1;
        } else {
          logo.addEventListener('load', function () {
            _this.countOfLoadedImages = _this.countOfLoadedImages + 1;

            if (_this.countOfLoadedImages === _this.images.length) {
              //animation start when all pictures loaded
              Parallax(parallaxContainer);
            }
          });
        }

        if (_this.countOfLoadedImages === _this.images.length) {
          //animation start when all pictures loaded
          Parallax(parallaxContainer);
        }
      });
    }
  }; // window.innerWidth > 768 && imageObject.init();

  if (window.innerWidth > 768) {
    Parallax(parallaxContainer);
  } else {
    var elements = document.querySelectorAll('.index__morewithless__blockwithhover__element');
    elements.forEach(function (elm) {
      elm.classList.add('mobile-page');
    });
  } // function onYouTubeIframeAPIReady() {
  //     window.YT.ready(function() {
  //         window.player = new YT.Player("player-container", {
  //             videoId, // YouTube Video ID
  //             width: 640, // Player width (in px)
  //              events: {
  //                 'onReady':onPlayerReady,
  //              },
  //             playerVars: {
  //                 autoplay: 0, // Auto-play the video on load
  //                 loop: 1, // Run the video in a loop
  //                 mute: 1, // Sound Off On
  //                 rel: 0,
  //                 controls: 0, // Show pause/play buttons in player
  //                 showinfo: 0, // Hide the video title
  //                 modestbranding: 1, // Hide the Youtube Logo
  //                 fs: 0, // Hide the full screen button
  //                 cc_load_policy: 0, // Hide closed captions
  //                 iv_load_policy: 0, // Hide the Video Annotations
  //                 autohide: 1, // Hide video controls when playing
  //             },
  //         });
  //     });
  // }
  // function onPlayerReady(event) {
  //     console.log("EVENT",event)
  //     // event.target.setVolume(100);
  //     event.target.playVideo();
  //     function onScrollChange(changes, observer) {
  //         changes.forEach(change => {
  //             if (change.intersectionRatio===0) {
  //                 event.target.pauseVideo();
  //             }
  //             else{
  //                 event.target.playVideo();
  //             }
  //         });
  //     }
  //     const options = {
  //         root: null, //root
  //         rootMargin: '0%',
  //         threshold: 0,
  //     };
  //     const observer = new IntersectionObserver(onScrollChange, options);
  //     const target = document.querySelector('.index__youtubeframe');
  //     if(target) observer.observe(target);
  // }
  // onYouTubeIframeAPIReady();


  var video = document.querySelector('div#player-container video');

  if (video !== null && typeof video !== 'undefined') {
    var onScrollChange = function onScrollChange(changes, observer) {
      changes.forEach(function (change) {
        if (change.intersectionRatio === 0) {
          video.pause();
        } else {
          video.play();
        }
      });
    };

    video.pause();
    var options = {
      root: null,
      //root
      rootMargin: '0%',
      threshold: 0
    };
    var observer = new IntersectionObserver(onScrollChange, options);
    var target = document.querySelector('.index__youtubeframe');
    if (target) observer.observe(target);
  } // const video = document.querySelector(".video-container video");
  // video.play();
  // const observer = new IntersectionObserver((entries) => {
  // entries.forEach((entry) => {
  //     if (!entry.isIntersecting) {
  //     video.pause();
  //     } else {
  //     video.play();
  //     }
  // });
  // }, {});
  // observer.observe(video);
  // $(window).on('scroll load', function(){
  //     $('.index__youtubeframe__frame iframe').each( function(i){
  //       player.pauseVideo();
  //       var scroll_position = $(window).scrollTop();
  //       var bottom_of_video = $(this).offset().top + ($(this).outerHeight() / 2);
  //       var bottom_of_window3 = $(window).scrollTop() + $(window).height();
  //       if( bottom_of_window3 > bottom_of_video && scroll_position < bottom_of_video ) {
  //         player.playVideo();
  //       } else {
  //         player.pauseVideo();
  //       }
  //     });
  //   });

};

exports.useHomePage = useHomePage;