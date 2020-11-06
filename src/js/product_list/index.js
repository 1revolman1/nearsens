export const useProductList=function main(){
    console.log(`PRODUCT LIST PAGE`);
    function onScrollChange(changes, observer) {
        changes.forEach(change => {
        if (change.intersectionRatio===0) {
            scrollable.classList.add("out-viewport")
            scrollable.style.opacity="1";
            scrollable.style.visibility="visible";

            console.log('Header is outside viewport');
            }else{
            scrollable.classList.remove("out-viewport")
            // scrollable.style.display="none";
            scrollable.style.opacity="0";
            scrollable.style.visibility="hidden";
            console.log('Header is IN THE viewport');
            }
            
        });
    }
    const options = {
        root: null, //root
        rootMargin: '-100px',
        threshold: 0,
      };

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
    
    const scrollToThisBlock=document.querySelector(".productlist__pageheader");
    const scrollable=document.querySelector("section.productlist__scrollheader");
    if(scrollToThisBlock && scrollable)
        document.querySelector(".productlist__scrollheader-wrapper__text-container__picker").addEventListener("click",function(event){
            scrollToThisBlock.scrollIntoView({block: "center", behavior: "smooth"});
        })
   
    const observer = new IntersectionObserver(onScrollChange, options);
     
    const target = document.querySelector('.productlist__pageheader');
    if(target) observer.observe(target);
}