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
// JavaScript Document
$.fn.countTo = function (options) {
  options = options || {};

  return $(this).each(function () {
    // set options for current element
    var settings = $.extend({}, $.fn.countTo.defaults, {
      from: $(this).data('from'),
      to: $(this).data('to'),
      speed: $(this).data('speed'),
      refreshInterval: $(this).data('refresh-interval'),
      decimals: $(this).data('decimals')
    }, options);

    // how many times to update the value, and how much to increment the value on each update
    var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;

    // references & variables that will change with each update
    var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};

    $self.data('countTo', data);

    // if an existing interval can be found, clear it first
    if (data.interval) {
      clearInterval(data.interval);
    }
    data.interval = setInterval(updateTimer, settings.refreshInterval);

    // initialize the element with the starting value
    render(value);

    function updateTimer() {
      value += increment;
      loopCount++;

      render(value);

      if (typeof settings.onUpdate == 'function') {
        settings.onUpdate.call(self, value);
      }

      if (loopCount >= loops) {
        // remove the interval
        $self.removeData('countTo');
        clearInterval(data.interval);
        value = settings.to;

        if (typeof settings.onComplete == 'function') {
          settings.onComplete.call(self, value);
        }
      }
    }

    function render(value) {
      var formattedValue = settings.formatter.call(self, value, settings);
      $self.html(formattedValue);
    }
  });
};

$.fn.countTo.defaults = {
  from: 0, // the number the element should start at
  to: 0, // the number the element should end at
  speed: 1000, // how long it should take to count between the target numbers
  refreshInterval: 100, // how often the element should be updated
  decimals: 0, // the number of decimal places to show
  formatter: formatter, // handler for formatting the value before rendering
  onUpdate: null, // callback method for every time the element is updated
  onComplete: null // callback method for when the element finishes updating
};

function formatter(value, settings) {
  return value.toFixed(settings.decimals);
}

// custom formatting example
$('#count-number').data('countToOptions', {
  formatter: function formatter(value, options) {
    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }
});

function count1(options) {
  document.getElementById('dt').style.display = "block";
}

function count(options) {
  var $this = $(this);
  options = $.extend({}, options || {}, $this.data('countToOptions') || {});
  $this.countTo(options);
}
;
$(function () {

  init();
  $('#all').html($('.swiper-container .swiper-slide').size());
  new Swiper('.banner .swiper-container', {
    loop: true, // 循环模式选项

    // 如果需要分页器
    pagination: '.swiper-pagination',
    paginationClickable: true,
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true,
    // },

    // 如果需要前进后退按钮
    prevButton: '.swiper-button-prev',
    nextButton: '.swiper-button-next',
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
    onInit: function onInit(swiper) {
      console.log(this);
      var slide = swiper.slides.eq(0);
      slide.addClass('ani-slide');
    },
    onTransitionStart: function onTransitionStart(swiper) {
      for (var i = 0; i < swiper.slides.length; i++) {
        var slide = swiper.slides.eq(i);
        slide.removeClass('ani-slide');
      }
    },
    onTransitionEnd: function onTransitionEnd(swiper) {
      var slide = swiper.slides.eq(swiper.activeIndex);
      slide.addClass('ani-slide');
      $('#index').html(swiper.realIndex + 1);
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
  var isinitcount = false;
  $(window).scroll(function () {
    if ($(window).scrollTop() > window.innerHeight * 1 / 3) {
      $('#smallnav').addClass('show');
      $('#top').addClass('show');
    } else {
      $('#smallnav').removeClass('show');
      $('#top').removeClass('show');
    }
    if ($(window).scrollTop() > $(document).height() - window.innerHeight * 3 / 2) {
      $('.aside-right.lianxi').fadeOut();
    } else {
      $('.aside-right.lianxi').fadeIn();
    }
    if (!isinitcount && $(window).scrollTop() > $(document).height() - window.innerHeight * 1.2) {
      isinitcount = true;
      $('.timer').each(count);
      // $('.timer').each(count1);
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
    control: [allscreenswiper],
    // controller: {
    //   control: allscreenswiper, //控制Swiper1
    // },
    // 如果需要前进后退按钮
    prevButton: '.prev',
    nextButton: '.next',
    // navigation: {
    //   nextEl: '.next',
    //   prevEl: '.prev',
    // },
    onInint: function onInint() {
      setScroll();
      this.emit('transitionEnd'); //在初始化时触发一次transitionEnd事件
    },
    on: {
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