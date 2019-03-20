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
  // popup
  $('#submit').click(function () {
    $('.popup-sefs').fadeIn();
  });
  $('#submit-lianxi').click(function () {
    $('.popup-bottom.popup-lianxi').fadeOut();
    $('.popup-sefs').fadeIn();
  });

  $('.lianxishangwu').click(function () {
    $('.popup-lianxi').fadeIn();
  });

  $('.popup-sefs-close').click(function () {
    $('.popup-sefs,.popup-lianxi').fadeOut();
  });
  // work 
  function setScroll() {
    $(".scroll-bar").each(function () {
      $(this).slimScroll({
        height: '100%',
        alwaysVisible: true
      });
    });
  }
  $(window).on("resize", setScroll);
  var allscreenswiper = new Swiper('.allscreen .swiper-container', {
    autoHeight: true, //enable auto height
    loop: true,
    on: {
      init: function init() {
        //Swiper初始化了
        this.emit('transitionEnd'); //在初始化时触发一次transitionEnd事件
      }
    }
  });
  var swiper = new Swiper('.h100.swiper-container', {
    loop: true,
    controller: {
      control: allscreenswiper //控制Swiper1
    },
    navigation: {
      nextEl: '.next',
      prevEl: '.prev'
    }, on: {
      init: function init() {
        //Swiper初始化了
        setScroll();
        this.emit('transitionEnd'); //在初始化时触发一次transitionEnd事件
      }
    }
  });
  // 调整 上下居中造成的模糊 block-center-div
  $('.block-center-div').each(function () {
    var h = $(this).height();
    console.log(h);
    if (h % 2 != 0) {
      $(this).height(parseInt(h) + 1);
    }
  });
}
function imgloaded(obj) {
  var h = $(obj).parent().height();
  console.log(h);
  if (h % 2 != 0) {
    $(obj).parent().height(parseInt(h) + 1);
  }
}