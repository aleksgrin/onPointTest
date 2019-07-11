var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; 
var slideDurationSetting = 600;
var currentSlideNumber = 0;
var sliderArray = document.querySelectorAll(".slides-container__item");
var paginationItems = document.querySelectorAll(".pagination__item");
var totalSlideNumber = sliderArray.length;
var scrollDownElement = document.querySelector('.scroll-down');

function parallaxScroll(evt) {
  delta = evt.wheelDelta;

  if (!ticking) {
    if (delta <= -scrollSensitivitySetting) {
      ticking = true;
      nextItem();
      slideDurationTimeout(slideDurationSetting);
    }

    if (delta >= scrollSensitivitySetting) {
      ticking = true;
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

function nextItem() {
  currentSlideNumber = (currentSlideNumber < totalSlideNumber - 1) ? ++currentSlideNumber : totalSlideNumber - 1;
  if (currentSlideNumber === totalSlideNumber - 1) {
    scrollDownElement.classList.add('scroll-down--hidden');
  }
  for (var i = 0; i < totalSlideNumber; i++) {
    paginationItems[i].classList.remove('pagination__item--active')
  }
  paginationItems[currentSlideNumber].classList.add('pagination__item--active');
  var previousSlide = sliderArray[currentSlideNumber - 1];
  previousSlide.classList.add("down-scroll");
}

function previousItem() {
  currentSlideNumber = (currentSlideNumber > 0) ? --currentSlideNumber : 0;
  if (currentSlideNumber === totalSlideNumber - 2) {
    if (scrollDownElement.classList.contains('scroll-down--hidden')) {
      scrollDownElement.classList.remove('scroll-down--hidden');
    }
  }
  for (var i = 0; i < totalSlideNumber; i++) {
    paginationItems[i].classList.remove('pagination__item--active')
  }
  paginationItems[currentSlideNumber].classList.add('pagination__item--active');
  var currentSlide = sliderArray[currentSlideNumber];
  currentSlide.classList.remove("down-scroll");
}

var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, parallaxScroll, false);
