function cartAnim() {
  const isMobile=window.innerWidth<=768;
  const cart=isMobile? $('.second-block-in-menu .cart-block'): $('.shop-cart');
  const imgtodrag = $(this).parents('.productlist__products-container-element').find("img").eq(0);
  const infoSuccessHeader=cart.find(".droupup-block-info");

  //SHOW SUCCESS BUYING ICON
  $(this).parents(".productlist__products-container-element-controllers-manipulator").addClass("show-success")
  infoSuccessHeader.removeClass("unshow");

  if (imgtodrag) {
      const imgclone = imgtodrag.clone()
          .offset({
          top: imgtodrag.offset().top,
          left: imgtodrag.offset().left
      })
          .css({
          'opacity': '0.5',
              'position': 'absolute',
              'height': '150px',
              'width': '150px',
              "border-radius":"10px",
              'z-index': '100'
      })
          .appendTo($('body'))
          .animate({
          'top': cart.offset().top + 10,
              'left': cart.offset().left + 10,
              'width': 30,
              'height': 30
      }, 1000, 'easeInOutExpo');   
      //SHAKE ANIM

      setTimeout(()=>{
        // console.log(  $(this))
        $(this).prop("disabled",true).children("i").addClass("fa-check").removeClass("fa-shopping-basket");
        $(this).parents(".productlist__products-container-element-controllers-manipulator").removeClass("show-success");
        infoSuccessHeader.addClass("unshow");
      },2000)

      imgclone.animate({
          'width': 0,
              'height': 0
      }, function () {
          $(this).detach()
      });
  }
}



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

    $('.productlist__products-container-element-controllers-shop button').on('click', cartAnim);

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