export const useProductList=function main(){
    console.log(`PRODUCT LIST PAGE`);
    $(".productlist__pageheader-wrapper__slider-container__slider").slick({
        infinite: true,
        slidesToShow: 15,
        slidesToScroll: 3,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 500,
        arrows:false,
        cssEase:"ease",
        swipeToSlide:true,
        responsive: [
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 7,
                slidesToScroll: 2
              }
            },
          ]
    })
    const options = {
        root: null, //root
        rootMargin: '0px',
        threshold: 0,
      };
    const scrollToThisBlock=document.querySelector(".productlist__pageheader");
    const scrollable=document.querySelector("section.productlist__scrollheader");
    document.querySelector(".productlist__scrollheader-wrapper__text-container__picker").addEventListener("click",function(event){
        scrollToThisBlock.scrollIntoView({block: "center", behavior: "smooth"});
     })
    function onChange(changes, observer) {
        changes.forEach(change => {
        if (change.intersectionRatio===0) {
            scrollable.classList.add("out-viewport")
            // console.log('Header is outside viewport');
            }else{
            scrollable.classList.remove("out-viewport")
            // console.log('Header is IN THE viewport');
            }
            
        });
    }
     
    const observer = new IntersectionObserver(onChange, options);
     
    const target = document.querySelector('.productlist__pageheader');
    observer.observe(target);
}