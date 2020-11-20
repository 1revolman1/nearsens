"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCasesDetails = void 0;

function cartAnim() {
  var _this = this;

  var isMobile = window.innerWidth <= 768;
  var cart = isMobile ? $('.second-block-in-menu .cart-block') : $('.shop-cart');
  var imgtodrag = $(this).parents('.usecase_details__blockwithbuyabbility-wrap__manipulator').find("img").eq(0);
  $(this).attr("disabled", "disabled"); //   const imgtodrag = $(this).parents('.usecase_details__blockwithbuyabbility-wrap').find(".usecase_details__blockwithbuyabbility-wrap__head img").eq(0);

  var infoSuccessHeader = cart.find(".droupup-block-info");
  var parent = $(this).parents(".usecase_details__blockwithbuyabbility-wrap__manipulator__block");
  var currentValue = parent.find("p").text().replace(/[^\d;]/g, '');
  if (currentValue === 0) return null;
  $(".dropdown.show-info h3").text("".concat($(".usecase_details__blockwithbuyabbility-wrap__element-content-manipulator:not([data-ammount='0'])").length, " product added to your cart"));
  parent.find(".shop-cart .success_block span").text("".concat(currentValue, " new added to cart")); //SHOW SUCCESS BUYING ICON

  parent.addClass("show-success");
  infoSuccessHeader.removeClass("unshow");

  if (imgtodrag) {
    var imgclone = imgtodrag.clone().offset({
      top: imgtodrag.offset().top,
      left: imgtodrag.offset().left
    }).css({
      'opacity': '0.5',
      'position': 'absolute',
      'height': '50px',
      'width': '50px',
      "border-radius": "10px",
      'z-index': '100'
    }).appendTo($('body')).animate({
      'top': cart.offset().top + 10,
      'left': cart.offset().left + 10,
      'width': 30,
      'height': 30
    }, 1000, 'easeInOutExpo'); //SHAKE ANIM

    setTimeout(function () {
      $(_this).parents(".usecase_details__blockwithbuyabbility-wrap__manipulator__block").removeClass("show-success");
      $(_this).removeAttr("disabled");
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
    });
  }
}

var useCasesDetails = function main() {
  console.log("usecase_details");
  var scrollable = document.querySelector("section.usecase_details__pageheaderafterscroll");

  function onScrollChange(changes, observer) {
    changes.forEach(function (change) {
      if (change.intersectionRatio === 0) {
        scrollable.classList.add("out-viewport");
        scrollable.style.opacity = "1";
        scrollable.style.visibility = "visible";
        console.log('Header is outside viewport');
      } else {
        scrollable.classList.remove("out-viewport"); // scrollable.style.display="none";

        scrollable.style.opacity = "0";
        scrollable.style.visibility = "hidden";
        console.log('Header is IN THE viewport');
      }
    });
  }

  var options = {
    root: null,
    //root
    rootMargin: '-100px',
    threshold: 0
  }; //counter price dynamicly

  var totalPrice = 0;
  var totalPricePlace = document.querySelector(".usecase_details__blockwithbuyabbility-wrap__manipulator .usecase_details__blockwithbuyabbility-wrap__manipulator__block p");
  document.querySelectorAll(".usecase_details__blockwithbuyabbility-wrap__element-content-manipulator .usecase_details__blockwithbuyabbility-wrap__element-content-manipulator-buttons .counter").forEach(function (elm, index) {
    totalPrice = totalPrice + Number(elm.textContent);
    document.querySelectorAll(".usecase_details__blockwithbuyabbility-wrap__element-content-manipulator")[index].setAttribute("data-ammount", Number(elm.textContent));
  });
  totalPricePlace.textContent = "".concat(totalPrice, " items");
  $('.usecase_details__blockwithbuyabbility-wrap__manipulator__block .shop-cart').on('click', cartAnim);
  $('.usecase_details__blockwithbuyabbility-wrap__element-content-manipulator-buttons .minus').on('click', function () {
    var container = $(this).parents(".usecase_details__blockwithbuyabbility-wrap__element-content-manipulator-buttons");
    var counter = container.find(".counter");
    var value = Number(counter.text());
    value -= 1;

    if (value === 0) {
      $(this).attr("disabled", true);
    }

    var finalAdd = container.parents(".usecase_details__blockwithbuyabbility-wrap.main").find(".usecase_details__blockwithbuyabbility-wrap__manipulator .usecase_details__blockwithbuyabbility-wrap__manipulator__block p");
    finalAdd.text("".concat(--totalPrice, " items"));
    var newPrice = totalPrice;
    container.parents(".usecase_details__blockwithbuyabbility-wrap__element-content-manipulator").attr("data-ammount", value);

    if (newPrice === 0) {
      $(this).parents(".usecase_details__blockwithbuyabbility-wrap.main").find(".usecase_details__blockwithbuyabbility-wrap__manipulator .usecase_details__blockwithbuyabbility-wrap__manipulator__block .shop-cart").attr("disabled", true);
    }

    counter.text(value);
  });
  $('.usecase_details__blockwithbuyabbility-wrap__element-content-manipulator-buttons .plus').on('click', function () {
    var container = $(this).parents(".usecase_details__blockwithbuyabbility-wrap__element-content-manipulator-buttons");
    var counter = container.find(".counter");
    var value = Number(counter.text());
    value += 1;

    if (value >= 1) {
      container.find(".minus").attr("disabled", false);
    }

    var finalAdd = container.parents(".usecase_details__blockwithbuyabbility-wrap.main").find(".usecase_details__blockwithbuyabbility-wrap__manipulator .usecase_details__blockwithbuyabbility-wrap__manipulator__block p");
    finalAdd.text("".concat(++totalPrice, " items"));
    var newPrice = totalPrice;
    container.parents(".usecase_details__blockwithbuyabbility-wrap__element-content-manipulator").attr("data-ammount", value);

    if (newPrice > 0) {
      $(this).parents(".usecase_details__blockwithbuyabbility-wrap.main").find(".usecase_details__blockwithbuyabbility-wrap__manipulator .usecase_details__blockwithbuyabbility-wrap__manipulator__block .shop-cart").attr("disabled", false);
    }

    counter.text(value);
  });
  var observer = new IntersectionObserver(onScrollChange, options);
  var target = document.querySelector('.usecase_details__pageheader');
  if (target) observer.observe(target);
};

exports.useCasesDetails = useCasesDetails;