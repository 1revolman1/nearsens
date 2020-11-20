export const useHomePage = function () {
    
    // function onYouTubeIframeAPIReady() {
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
    
    const video = document.querySelector("div#player-container video");

    if(video!==null && typeof video!=="undefined"){
        video.pause();
        function onScrollChange(changes, observer) {
            changes.forEach(change => {
                if (change.intersectionRatio===0) {
                    video.pause();
                }
                else{
                    video.play();
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
        if(target) observer.observe(target);
    }
    

    // const video = document.querySelector(".video-container video");
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
  