import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

import libs from './lib/dependancies';
window.libs = libs;

$(document).foundation();

libs.AOS.init();

// SVG Injector
// Elements to inject
var mySVGsToInject = document.querySelectorAll('img.inject-me');

// Options
var injectorOptions = {
  evalScripts: 'once',
  pngFallback: 'assets/png'
};

var afterAllInjectionsFinishedCallback = function (totalSVGsInjected) {
  // Callback after all SVGs are injected
  console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
};

var perInjectionCallback = function (svg) {
  // Callback after each SVG is injected
  console.log('SVG injected: ' + svg);
};

// create injector configured by options
var injector = new libs.svgInjector(injectorOptions);

// Trigger the injection
injector.inject(
  mySVGsToInject,
  afterAllInjectionsFinishedCallback,
  perInjectionCallback
);

// slick carousel
$(".slideshow").slick({
  // normal options...
  speed: 1000,
	autoplay: true,
	autoplaySpeed: 3000,
	cssEase: 'linear',
  fade: true,
  dots: false,
  arrows: false,
  infinite: true,
	centerMode: true
});

// Form Handling

var inputUI = function () {
  let input_selector =
    'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';
  let inputs = $(input_selector);
  inputs.each(function(index, el) {
    let $this = $(this);
    if (
      el.value.length > 0 ||
      $(el).is(':focus') ||
      el.autofocus ||
      $this.attr('placeholder') !== null
    ) {
      console.log('did something');
      $this.siblings('label').addClass('active');
    } else {
      console.log('did nothing')
    }
    
//    else if (el.validity) {
//      $this.siblings('label').toggleClass('active', el.validity.badInput === true);
//    } else {
//      $this.siblings('label').removeClass('active');
//    }
  });
}

$(function() {
  inputUI();
});