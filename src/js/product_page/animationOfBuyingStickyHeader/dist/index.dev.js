"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBuyingAnimationStickyHeader = void 0;

function cartHeaderAnim() {
  var _this = this;

  var isMobile = window.innerWidth <= 768;
  var cart = isMobile ? $('.second-block-in-menu .cart-block') : $('.shop-cart');
  var infoSuccessHeader = cart.find(".droupup-block-info"); //SHOW SUCCESS BUYING ICON

  $(this).parents(".productpage__pageheader-wrap-manipulator-container").addClass("show-success");
  infoSuccessHeader.removeClass("unshow");
  var imgtodrag = $(this).parents(".productpage__pageheader-wrap-container").find(".productpage__pageheader-wrap-headblock img").eq(0);

  if (imgtodrag) {
    var imgclone = imgtodrag.clone().offset({
      top: imgtodrag.offset().top,
      left: imgtodrag.offset().left
    }).css({
      'opacity': '0.5',
      'position': 'absolute',
      'height': '70px',
      'width': '70px',
      "border-radius": "10px",
      'z-index': '100'
    }).appendTo($('body')).animate({
      'top': cart.offset().top + 10,
      'left': cart.offset().left + 10,
      'width': 30,
      'height': 30
    }, 1000, 'easeInOutExpo'); //SHAKE ANIM

    setTimeout(function () {
      $(_this).parents(".productpage__pageheader-wrap-manipulator-container").removeClass("show-success");
      infoSuccessHeader.addClass("unshow");
    }, 2000); // if(!isMobile) 
    //     setTimeout(function () {
    //         cart.effect("shake", {
    //             times: 2
    //         }, 200);
    //     }, 1500);

    imgclone.animate({
      'width': 0,
      'height': 0
    }, function () {
      $(this).detach();
    }); // $(this).parents(".productpage__pageheader-wrap-manipulator-container").removeClass("show-success")
  }
}

function cartAnimInStickyHeader() {
  var _this2 = this;

  var isMobile = window.innerWidth <= 768;
  var cart = isMobile ? $('.second-block-in-menu .cart-block') : $('.shop-cart');
  var infoSuccessHeader = cart.find(".droupup-block-info"); //SHOW SUCCESS BUYING ICON

  $(this).parents(".productpage__pageheader_sticky-wrap-manipulator-container").addClass("show-success");
  infoSuccessHeader.removeClass("unshow");
  var imgtodrag = $(".productpage__pageheader_sticky-wrap-headblock > img");

  if (imgtodrag) {
    var imgclone = imgtodrag.clone().offset({
      top: imgtodrag.offset().top,
      left: imgtodrag.offset().left
    }).css({
      'opacity': '0.5',
      'position': 'absolute',
      'height': '70px',
      'width': '70px',
      "border-radius": "10px",
      'z-index': '100'
    }).appendTo($('body')).animate({
      'top': cart.offset().top + 10,
      'left': cart.offset().left + 10,
      'width': 30,
      'height': 30
    }, 1000, 'easeInOutExpo');
    setTimeout(function () {
      $(_this2).parents(".productpage__pageheader_sticky-wrap-manipulator-container").removeClass("show-success");
      infoSuccessHeader.addClass("unshow");
    }, 2000);
    imgclone.animate({
      'width': 0,
      'height': 0
    }, function () {
      $(this).detach();
    });
  }
}

var useBuyingAnimationStickyHeader = function main(element) {
  element.querySelector(".productpage__pageheader_sticky-wrap-manipulator-withprice").addEventListener("click", cartAnimInStickyHeader);
  document.querySelectorAll('.productpage__pageheader_sticky .productpage__pageheader_sticky-wrap .productpage__pageheader_sticky-wrap-manipulator-container.overlay').forEach(function (elm) {
    var value = elm.querySelector("span").textContent;

    if (+value >= 1) {
      elm.querySelectorAll("button").forEach(function (e) {
        e.removeAttribute("disabled");
      });
      elm.parentNode.querySelector(".productpage__pageheader_sticky-wrap-manipulator-withprice button").removeAttribute("disabled");
    } else {
      elm.querySelectorAll(".minus").forEach(function (e) {
        e.setAttribute("disabled", "disabled");
      });
      elm.parentNode.querySelector(".productpage__pageheader_sticky-wrap-manipulator-withprice button").setAttribute("disabled", "disabled");
    }
  });
  $('.productpage__pageheader_sticky-wrap .productpage__pageheader_sticky-wrap-manipulator-data .minus').on('click', function () {
    var container = $(this).parents(".productpage__pageheader_sticky-wrap-manipulator-data");
    var counter = container.find("span");
    var value = Number(counter.text());
    value -= 1;

    if (value === 0) {
      $(this).attr("disabled", true);
      $(this).parents(".productpage__pageheader_sticky-wrap-manipulator-container.overlay").find(".productpage__pageheader_sticky-wrap-manipulator-withprice button").attr("disabled", true);
    }

    var finalAdd = container.parents(".productpage__pageheader_sticky-wrap-manipulator-container").find(".productpage__pageheader_sticky-wrap-manipulator-successbuying p span");
    finalAdd.text("".concat(value, " new added to cart"));
    counter.text(value);
  });
  $('.productpage__pageheader_sticky-wrap .productpage__pageheader_sticky-wrap-manipulator-data .plus').on('click', function () {
    var container = $(this).parents(".productpage__pageheader_sticky-wrap-manipulator-data");
    var counter = container.find("span");
    var value = Number(counter.text());
    value += 1;

    if (value >= 1) {
      container.find(".minus").attr("disabled", false);
      $(this).parents(".productpage__pageheader_sticky-wrap-manipulator-container.overlay").find(".productpage__pageheader_sticky-wrap-manipulator-withprice button").attr("disabled", false);
    }

    var finalAdd = container.parents(".productpage__pageheader_sticky-wrap-manipulator-container").find(".productpage__pageheader_sticky-wrap-manipulator-successbuying p span");
    finalAdd.text("".concat(value, " new added to cart"));
    counter.text(value);
  });
};

exports.useBuyingAnimationStickyHeader = useBuyingAnimationStickyHeader;