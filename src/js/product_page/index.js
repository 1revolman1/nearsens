function  cartAnim() {
    const isMobile=window.innerWidth<=768;
    const cart=isMobile? $('.second-block-in-menu .cart-block'): $('.shop-cart');
    const imgtodrag = $(this).parents('.productlist__products-container-element').find("img").eq(0);
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

        // if(!isMobile) 
        //     setTimeout(function () {
        //         cart.effect("shake", {
        //             times: 2
        //         }, 200);
        //     }, 1500);

        imgclone.animate({
            'width': 0,
                'height': 0
        }, function () {
            $(this).detach()
        });
    }
}
function cartHeaderAnim(){
    const isMobile=window.innerWidth<=768;
    const cart=isMobile? $('.second-block-in-menu .cart-block'): $('.shop-cart');
    const imgtodrag =$(this).parents(".productpage__pageheader-wrap-container").find(".productpage__pageheader-wrap-headblock img").eq(0);
    if (imgtodrag) {
        const imgclone = imgtodrag.clone()
            .offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left
        })
            .css({
            'opacity': '0.5',
                'position': 'absolute',
                'height': '70px',
                'width': '70px',
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

        // if(!isMobile) 
        //     setTimeout(function () {
        //         cart.effect("shake", {
        //             times: 2
        //         }, 200);
        //     }, 1500);

        imgclone.animate({
            'width': 0,
                'height': 0
        }, function () {
            $(this).detach()
        });
    }
}
function cartAnimInStickyHeader(){
    const isMobile=window.innerWidth<=768;
    const cart=isMobile? $('.second-block-in-menu .cart-block'): $('.shop-cart');
    // const imgDrag=$(".productpage__pageheader-wrap-headblock img");
    const imgtodrag=$(".productpage__pageheader_sticky-wrap-headblock > img");
    // const imgtodrag = $(this).parents('.productlist__products-container-element').find("img").eq(0);
    if (imgtodrag) {
        const imgclone = imgtodrag.clone()
            .offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left
        })
            .css({
            'opacity': '0.5',
                'position': 'absolute',
                'height': '70px',
                'width': '70px',
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
        imgclone.animate({
            'width': 0,
                'height': 0
        }, function () {
            $(this).detach()
        });
    }
}
export const useProductPage=function main() {
console.log("product_page")
const isMobile=window.innerWidth<=768;
$('.productlist__products-container-element-controllers-shop button').on('click', cartAnim);
$('.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-withprice').on('click', cartHeaderAnim);
const popUp=document.querySelector(".productpage__pageheader_sticky-wrap-manipulator-container.overlay");
const buttonToOpenBuy=document.querySelector(".productpage__pageheader_sticky-wrap-manipulator-container.main-btn");
const scrollable=document.querySelector("section.productpage__pageheader_sticky")
function onScrollChange(changes, observer) {
    changes.forEach(change => {
    if (change.intersectionRatio===0) {
        scrollable.classList.add("out-viewport")
        scrollable.style.opacity="1";
        scrollable.style.visibility="visible";

        console.log('Header is outside viewport');
        }else{
        scrollable.classList.remove("out-viewport")
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
let event=null;
if(isMobile){
    window.addEventListener("scroll", function(e) {
        // print "false" if direction is down and "true" if up
        const toBottom=this.oldScroll < this.scrollY;
        if(toBottom){
            scrollable.classList.add("scroll-to-bottom");
        }else{
            scrollable.classList.remove("scroll-to-bottom");
        }
        clearTimeout(event);
        event=setTimeout(()=>{
            scrollable.classList.remove("scroll-to-bottom");
        },700)
        this.oldScroll = this.scrollY;
    });
    buttonToOpenBuy.addEventListener("click",function(){
        popUp.classList.add("isOpen")
    })
} 
popUp.querySelector(".productpage__pageheader_sticky-wrap-manipulator-withprice").addEventListener("click",cartAnimInStickyHeader)
const observer = new IntersectionObserver(onScrollChange, options);
const target = document.querySelector('section.productpage__pageheader');
if(target) observer.observe(target);

}