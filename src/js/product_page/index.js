export const useProductPage=function main() {
    console.log("product_page")
    $('.productlist__products-container-element-controllers-shop button').on('click', function () {
        var cart = $('.shop-cart');
        var imgtodrag = $(this).parents('.productlist__products-container-element').find("img").eq(0);
        // var imgtodrag = $(this).parents('.productlist__products-container-element').find("img").eq(0);
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
                .css({
                'opacity': '0.5',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'z-index': '100'
            })
                .appendTo($('body'))
                .animate({
                'top': cart.offset().top + 10,
                    'left': cart.offset().left + 10,
                    'width': 75,
                    'height': 75
            }, 1000, 'easeInOutExpo');
            
            setTimeout(function () {
                cart.effect("shake", {
                    times: 2
                }, 200);
            }, 1500);

            imgclone.animate({
                'width': 0,
                    'height': 0
            }, function () {
                $(this).detach()
            });
        }
    });
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
    
    const observer = new IntersectionObserver(onScrollChange, options);
    const target = document.querySelector('section.productpage__pageheader');
    if(target) observer.observe(target);
}