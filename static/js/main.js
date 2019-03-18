'use strict';

/* eslint-disable */
/*
const Zepto = (function () {
  let zepto = {},
    $;

  function Z(doms) {
    const len = doms.length;
    for (let i = 0; i < len; i++) {
      this[i] = doms[i];
    }
    this.length = doms.length;
  }

  zepto.Z = function (doms) {
    return new Z(doms);
  };

  zepto.init = function (doms) {
    var doms = ['domObj1', 'domObj2', 'domObj3'];
    return zepto.Z(doms);
  };

  $ = function () {
    return zepto.init();
  };

  $.fn = {
    constructor: zepto.Z,
    method() {
      return this;
    },
  };

  zepto.Z.prototype = Z.prototype = $.fn;

  return $;
}());

window.Zepto = Zepto;
window.$ === undefined && (window.$ = Zepto);
*/
// console.log($().method());
$(function () {
  init();
  $('#all').html($('.swiper-container .swiper-slide').size());
  new Swiper('.banner .swiper-container', {
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    on: {
      init: function init(swiper) {
        console.log(this);
        var slide = this.slides.eq(0);
        slide.addClass('ani-slide');
      },
      transitionStart: function transitionStart() {
        for (var i = 0; i < this.slides.length; i++) {
          var slide = this.slides.eq(i);
          slide.removeClass('ani-slide');
        }
      },
      transitionEnd: function transitionEnd() {
        var slide = this.slides.eq(this.activeIndex);
        slide.addClass('ani-slide');
        $('#index').html(this.activeIndex);
      }
      // 如果需要滚动条
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
    } });
});
function init() {
  $(window).scroll(function () {
    if ($(window).scrollTop() > window.innerHeight * 1 / 3) {
      $('#smallnav').addClass('show');
      $('#top').addClass('show');
    } else {
      $('#smallnav').removeClass('show');
      $('#top').removeClass('show');
    }
  });
  $('#top').click(function () {
    $('html,body').animate({ scrollTop: 0 });
  });
  $('#close').click(function () {
    $('#bignavshow').fadeOut();
  });
  $('#mune').click(function () {
    $('#bignavshow').fadeIn();
  });
  var wow = new WOW({
    boxClass: 'sloth',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true,
    callback: function callback(box) {
      // the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null // optional scroll container selector, otherwise use window
  });
  wow.init();
}