import $ from 'jquery';
import whatInput from 'what-input';
window.$ = $;
import Foundation from 'foundation-sites';
//import libs from './lib/dependancies';
//window.libs = libs;
$(document).foundation();


/*
==================================================
================================================== Scrolling Slideshow Animation
==================================================
*/

function positionVideo() {
  var windowH = $(window).height(),
      videoH = $('#landing-video').height(),
      offset = (windowH - videoH) / 2 - 60;
  $('#landing-video').css('top', offset);
}

function sizeLanding() {
  var windowW = $(window).width(),
      windowH = $(window).height(),
      $hero = $('#no-js-hero-image'),
      heroH = $hero.height(),
      heroW = $hero.width(),
      heroX = $hero.offset().left,
      heroY = $hero.offset().top,
      $slideshow = $('#hero-slideshow'),
      $slides = $('.slide');
  if ( (windowH / windowW) > (heroH / heroW) ) {
    $slides.css('height', '100%'); //  console.log('window is higher');
      var slideH = $slides.height();
    $slides.css('width', (slideH * (heroW / heroH)) );
  } else {
    $slides.css('height', 'auto');
    $slides.css('width', '100%');
  }
}

function sizeSlideshow() {
  var windowW = $(window).width(),
      windowH = $(window).height(),
      $hero = $('#no-js-hero-image'),
      heroH = $hero.height(),
      heroW = $hero.width(),
      heroX = $hero.offset().left,
      heroY = $hero.offset().top,
      $slideshow = $('#hero-slideshow'),
      $slides = $('.slide');
  $slideshow.css('top', heroY); //  console.log('sized slideshow');
  $slideshow.css('left', heroX);
  $slideshow.css('bottom', (windowH - heroH - heroY));
  $slideshow.css('right', (windowW - heroW - heroX));
  $('.body').removeClass('not-scrolled');
}

$(function() {
  if ($('.wait-for-me').length > 0) {
    setTimeout(function(){
      $('body').removeClass('fade');
    }, 5000);
    Foundation.onImagesLoaded($('.wait-for-me'), function(){
      var scrolled = false;
      positionVideo();
      $('body').removeClass('fade');
      if ($('#hero-slideshow')) { //if there is a slideshow
        sizeLanding(); //Size the slideshow to the browser window
        $(window).resize(function() { //resize slideshow on window resize
          if (!scrolled) {
            positionVideo();
          }
          sizeSlideshow();
        });
        $(window).scroll(function() { //shrink slideshow on scroll
          if (!scrolled) {
            scrolled = true;
            sizeSlideshow();
            return scrolled;
          }
        });
        $('.slide').click(function() { //shrink slideshow on click
          if (!scrolled) {
            scrolled = true;
            sizeSlideshow();
            return scrolled;
          }
        });
      }
    });
  } else {
    $('body').removeClass('fade');
  }
  if (window.location.href.indexOf('#') != -1) {
    $('#landing-video-container').remove();
    sizeSlideshow();
  }
});



/*
==================================================
================================================== Reveal top bar logo after scrolling past hero logo
==================================================
*/

$.fn.exists = function () {
    return this.length !== 0;
}

$(function() {
  if ( $('#no-js-hero-image').exists() ) {
    var $nav = $('#nav-bar'),
        $logo = $('.logo'),
        $hero = $('#no-js-hero-image');

      $nav.addClass('hidden');

    $(window).scroll(function() {
      var logoY = $logo.offset().top,
          heroY = $hero.offset().top;
      if ( logoY < (heroY + 250) ) {
        $nav.addClass('hidden');
      } else {
        $nav.removeClass('hidden');
      }
    });
  }
});


/*
==================================================
================================================== Slideshow Animation
==================================================
*/
$(function() {
  $('#hero-slideshow > .slide:gt(0)').hide();
  var counter = 0;
  var nSlides = $('.slide').length; 
  setInterval(function() {
    counter++;
    $('#hero-slideshow > .slide:first')
      .fadeOut(2000)
      .next()
      .fadeIn(2000)
      .end()
      .appendTo('#hero-slideshow');
    if (counter == 1) {
      $('#landing-logo-animation').fadeOut(500);
//      remove();
      sizeSlideshow();
    }
  }, 4000);
});

/*
==================================================
================================================== Smooth Scroll to Anchor
==================================================
*/ 

$(document).on('click', 'a[href^="#section"]', function (event) {
  event.preventDefault();
  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 500);
});

/*
==================================================
================================================== AJAX Modal
==================================================
*/ 

$('.reveal-inquire').on('click', function() {
  $(this).attr("data-origin", "true");
  $.ajax('inquire-modal.html').
    done(function(content) {
      $('#modal').html(content).foundation('open');
  });
})

$('[data-reveal]').on('open.zf.reveal', function () {
  _ictt.push(['_allocate']); // reallocate Infitiny tracking for dymanic phone number
  $(document).foundation(); // reinitialize foundation for form validation
  var dataLocation = $('[data-origin="true"]').data("location"); //grabs the location value from the button that originated the modal opening
  $("[data-location-option='" + dataLocation + "']").prop("selected", "selected");
  $('[data-origin="true"]').attr("data-origin", "false"); // reset originating button
});
  
/*
==================================================
================================================== Inquire Splash
==================================================
*/ 

$('#special-inquire-button').on('click', function() {
  $('#inquire-splash').addClass('open');
})

$('[data-reveal]').on('closed.zf.reveal', function () {
//  var modal = $(this);
  $('#inquire-splash').removeClass('open');
  $('option[value=""]').prop("selected", "selected");
});

/*
==================================================
================================================== Form Handling
==================================================
*/ 

let input_selector =
  'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';

var inputUI = function () {
  let inputs = $(input_selector);
  inputs.each(function(index, el) {
    let $this = $(this);
    if (
      el.value.length > 0 ||
      $(el).is(':focus') ||
      el.autofocus ||
      $this.attr('placeholder') !== ""
    ) {
      console.log('added full to input ' + index);
      $this.addClass('full');
    } else {
      console.log('removed full from input ' + index)
      $this.removeClass('full');
    }
    
//    else if (el.validity) {
//      $this.siblings('label').toggleClass('active', el.validity.badInput === true);
//    }
  });
}

$(function() {
  inputUI();
});

/**
 * Add full when element has focus
 * @param {Event} e
 */
document.addEventListener(
  'focus',
  function(e) {
    if ($(e.target).is(input_selector)) {
      $(e.target).addClass('full');
    }
  },
  true
);

/**
 * Remove full when element is blurred and empty
 * @param {Event} e
 */
document.addEventListener(
  'blur',
  function(e) {
    
    
    let $inputElement = $(e.target);
    if ($inputElement.is(input_selector)) {
      if (
        $inputElement[0].value.length === 0 &&
        $inputElement.attr('placeholder') === ""
      ) {
        $inputElement.removeClass('full');
      }
    }
  },
  true
);

//let input_selector =
//  'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';
//
//var inputUI = function () {
//  let inputs = $(input_selector);
//  inputs.each(function(index, el) {
//    let $this = $(this);
//    if (
//      el.value.length > 0 //||
////      $(el).is(':focus') ||
////      el.autofocus ||
////      $this.attr('placeholder') !== ""
//    ) {
//      $this.addClass('full'); console.log('added full to input ' + index);
//    } else {
//      $this.removeClass('full'); console.log('removed full from input ' + index);
//    }
//  });
//}
//
//$(function() {
//  inputUI();
//});
//
//document.addEventListener('focus', function(e) {
//    if ($(e.target).is(input_selector)) {
//      $(e.target).addClass('full');
//    }
//  }, true);
//
//document.addEventListener('blur', function(e) {
//    let $inputElement = $(e.target);
//    if ($inputElement.is(input_selector)) {
//      if (
//        $inputElement[0].value.length === 0 &&
//        $inputElement.attr('placeholder') === ""
//      ) {
//        $inputElement.removeClass('full');
//      }
//    }
//  },true);

$(function(){
  if(window.location.href.indexOf('/de/#form-submission-successful') != -1) {
    $.ajax('form-submission-successful-modal.html').
      done(function(content) {
        $('#instant-modal').html(content).foundation('open');
    });
    window.location.hash=""; 
  }
});


// HTML DOM FORM RESET handling
$(document).on('reset', function(e) {
  let formReset = $(e.target);
  if (formReset.is('form')) {
    formReset
      .find(input_selector)
      .removeClass('valid')
      .removeClass('invalid');
    formReset.find(input_selector).each(function(e) {
      if (this.value.length) {
        $(this)
          .removeClass('full');
      }
    });

    // Reset select (after native reset)
    setTimeout(function() {
      formReset.find('select').each(function() {
        // check if initialized
        if (this.M_FormSelect) {
          $(this).trigger('change');
        }
      });
    }, 0);
  }
});

//libs.AOS.init();
//
//// SVG Injector
//// Elements to inject
//var mySVGsToInject = document.querySelectorAll('img.inject-me');
//
//// Options
//var injectorOptions = {
//  evalScripts: 'once',
//  pngFallback: 'assets/png'
//};
//
//var afterAllInjectionsFinishedCallback = function (totalSVGsInjected) {
//  // Callback after all SVGs are injected
//  console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
//};
//
//var perInjectionCallback = function (svg) {
//  // Callback after each SVG is injected
//  console.log('SVG injected: ' + svg);
//};
//
//// create injector configured by options
//var injector = new libs.svgInjector(injectorOptions);
//
//// Trigger the injection
//injector.inject(
//  mySVGsToInject,
//  afterAllInjectionsFinishedCallback,
//  perInjectionCallback
//);
//
//// slick carousel
//$(".slideshow").slick({
//  // normal options...
//  speed: 1000,
//	autoplay: true,
//	autoplaySpeed: 2400,
//	cssEase: 'linear',
//  fade: true,
//  dots: false,
//  arrows: false,
//  infinite: true,
//	centerMode: true
//});
