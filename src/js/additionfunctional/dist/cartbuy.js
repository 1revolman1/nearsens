"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.cartAnim = exports.debounce = exports.isMobile = exports.isTouchDevice = void 0;
exports.isTouchDevice = function isTouchDevice() {
    return ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0);
};
exports.isMobile = function () { return window.innerWidth <= 1023; };
exports.debounce = function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
};
exports.cartAnim = function cartAnim(params) {
    var settings = __assign(__assign({}, params), { cartSelectors: {
            mobile: '.second-block-in-menu .cart-block',
            desktop: '.shop-cart'
        }, mainBlockContainer: '.animation-container', imgDraggable: '.img-draggable' });
    return function () {
        var _this = this;
        var isMobile = isMobile();
        var ourMainBlock = $(this).parents(settings.mainBlockContainer);
        var cart = isMobile
            ? $(settings.cartSelectors.mobile)
            : $(settings.cartSelectors.desktop);
        var infoSuccessHeader = cart.find('.droupup-block-info');
        var imgtodrag = ourMainBlock.find(settings.imgDraggable).eq(0);
        var totalPrice = ourMainBlock.find('.price-container').text();
        if (Number(totalPrice) <= 0)
            return null;
        container.addClass('show-success');
        infoSuccessHeader.removeClass('unshow');
        infoSuccessHeader
            .find('h3')
            .text(+totalPrice === 1
            ? infoSuccessHeader
                .find('.template.one')
                .text()
                .replace('1 ;', String(totalPrice))
            : infoSuccessHeader
                .find('.template.many')
                .text()
                .replace('1 ;', String(totalPrice)));
        if (imgtodrag) {
            var imgclone_1 = imgtodrag
                .clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
                .css({
                opacity: '0.5',
                position: 'absolute',
                height: '150px',
                width: '150px',
                'border-radius': '10px',
                'z-index': '100'
            })
                .appendTo($('body'))
                .animate({
                top: cart.offset().top + 10,
                left: cart.offset().left + 10,
                width: 30,
                height: 30
            }, 1000, 'easeInOutExpo', function () {
                imgclone_1.animate({
                    width: 0,
                    height: 0
                }, function () {
                    $(this).detach();
                });
            });
            //SHAKE ANIM
            setTimeout(function () {
                var containerShown = $(_this).parents('.productlist__products-container-element-controllers-manipulator');
                containerShown.removeClass('show-success');
                textContainer.text('1');
                containerShown
                    .find('.productlist__products-container-element-controllers-counter .minus')
                    .attr('disabled', true);
                setTimeout(function () {
                    var template = containerShown
                        .find('.productlist__products-container-element-controllers-successbuying .template')
                        .text();
                    containerShown
                        .find('.productlist__products-container-element-controllers-successbuying .desktop')
                        .text(template.replace('1 ;', '1'));
                }, 500);
            }, 2000);
            clearTimeout(interval);
            interval = setTimeout(function () {
                infoSuccessHeader.addClass('unshow');
            }, 2000);
        }
    };
};
