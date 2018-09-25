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

$(function() {
  if ($('#hero-slideshow')) {
    var windowW = $(window).width(),
        windowH = $(window).height(),
        $hero = $('#no-js-hero-image'),
        heroH = $hero.height(),
        heroW = $hero.width(),
        heroX = $hero.offset().left,
        heroY = $hero.offset().top,
        $slideshow = $('#hero-slideshow'),
        $slides = $('.slides');
//    if () SIZE INITLA SLIDESHOW BASED ON WINDOW SIZE
    $(window).scroll(function() {
      $slideshow.css('top', heroY);
      $slideshow.css('left', heroX);
      $slideshow.css('bottom', (windowH - heroH - heroY));
      $slideshow.css('right', (windowW - heroW - heroX));
      $('.body').removeClass('not-scrolled');
      $(window).off('scroll');
    });
  }
});


/*
==================================================
================================================== AJAX Modal
==================================================
*/ 


$('.reveal-inquire').on('click', function() {
  $.ajax('inquire-modal.html').
    done(function(content) {
      $('#modal').html(content).foundation('open');
  });
})

$('[data-reveal]').on('open.zf.reveal', function () {
  $(document).foundation();
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
      $this.addClass('full'); //console.log('added full to input ' + index);
    } else {
      $this.removeClass('full'); //console.log('removed full from input ' + index);
    }
  });
}

$(function() {
  inputUI();
});

document.addEventListener('focus', function(e) {
    if ($(e.target).is(input_selector)) {
      $(e.target).addClass('full');
    }
  }, true);

document.addEventListener('blur', function(e) {
    let $inputElement = $(e.target);
    if ($inputElement.is(input_selector)) {
      if (
        $inputElement[0].value.length === 0 &&
        $inputElement.attr('placeholder') === ""
      ) {
        $inputElement.removeClass('full');
      }
    }
  },true);

$(function(){
  if(window.location.href.indexOf('#form-submission-successful') != -1) {
    $.ajax('form-submission-successful-modal.html').
      done(function(content) {
        $('#instant-modal').html(content).foundation('open');
    });
    window.location.hash=""; 
  }
});





// HTML DOM FORM RESET handling
//$(document).on('reset', function(e) {
//  let formReset = $(e.target);
//  if (formReset.is('form')) {
//    formReset
//      .find(input_selector)
//      .removeClass('valid')
//      .removeClass('invalid');
//    formReset.find(input_selector).each(function(e) {
//      if (this.value.length) {
//        $(this)
//          .removeClass('full');
//      }
//    });
//
//    // Reset select (after native reset)
//    setTimeout(function() {
//      formReset.find('select').each(function() {
//        // check if initialized
//        if (this.M_FormSelect) {
//          $(this).trigger('change');
//        }
//      });
//    }, 0);
//  }
//});

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
