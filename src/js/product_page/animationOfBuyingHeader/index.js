function cartHeaderAnim(){
    const isMobile=window.innerWidth<=768;
    const cart=isMobile? $('.second-block-in-menu .cart-block'): $('.shop-cart');
    const infoSuccessHeader=cart.find(".droupup-block-info");
    console.log(infoSuccessHeader)
    //SHOW SUCCESS BUYING ICON
    $(this).parents(".productpage__pageheader-wrap-manipulator-container").addClass("show-success")
    infoSuccessHeader.removeClass("unshow");

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

        setTimeout(()=>{
            $(this).parents(".productpage__pageheader-wrap-manipulator-container").removeClass("show-success");
            infoSuccessHeader.addClass("unshow");
        },2000)
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
        // $(this).parents(".productpage__pageheader-wrap-manipulator-container").removeClass("show-success")
    }
}


export const useBuyingAnimationHeader=function main(){
    $('.productpage__pageheader .productpage__pageheader-wrap-container .productpage__pageheader-wrap-manipulator-withprice').on('click', cartHeaderAnim);
}