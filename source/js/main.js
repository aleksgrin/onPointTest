'use strict';

(function () {
  var SCROLL_SENSIVITY = 30;
  var SLIDE_WAIT = 600;

  var sliderArray = document.querySelectorAll(".slides-container__item");
  var paginationItems = document.querySelectorAll(".pagination__item");
  var scrollDownElement = document.querySelector('.scroll-down');
  
  var ticking = false;
  var currentSlideNumber = 0;
  var totalSlideNumber = sliderArray.length;
  var startTouchY = null;
  var endTouchY = null;


  function showItem(delta) {
    if (!ticking) {
      if (delta <= -SCROLL_SENSIVITY) {
        ticking = true;
        nextItem();
        slideDurationTimeout(SLIDE_WAIT);
      }

      if (delta >= SCROLL_SENSIVITY) {
        ticking = true;
        previousItem();
        slideDurationTimeout(SLIDE_WAIT);
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
    var previousSlide = sliderArray[currentSlideNumber - 1];

    if (currentSlideNumber === totalSlideNumber - 1) {
      scrollDownElement.classList.add('scroll-down--hidden');
    }
    for (var i = 0; i < totalSlideNumber; i++) {
      paginationItems[i].classList.remove('pagination__item--active')
    }
    paginationItems[currentSlideNumber].classList.add('pagination__item--active');
    previousSlide.classList.remove("up-scroll");
    previousSlide.classList.add("down-scroll");
  }

  function previousItem() {
    currentSlideNumber = (currentSlideNumber > 0) ? --currentSlideNumber : 0;
    var currentSlide = sliderArray[currentSlideNumber];

    if (currentSlideNumber === totalSlideNumber - 2) {
      scrollDownElement.classList.remove('scroll-down--hidden');
    }
    for (var i = 0; i < totalSlideNumber; i++) {
      paginationItems[i].classList.remove('pagination__item--active')
    }
    paginationItems[currentSlideNumber].classList.add('pagination__item--active');
    currentSlide.classList.remove("down-scroll");
    currentSlide.classList.add("up-scroll");
  }

  window.addEventListener('wheel', function (evt) {
    var delta = evt.wheelDelta;
    showItem(delta)
  });

  window.addEventListener('touchstart', function (startEvt) {
    startTouchY = startEvt.changedTouches[0].clientY;
  });
  window.addEventListener('touchend', function (endEvt) {
    endTouchY = endEvt.changedTouches[0].clientY;
    showItem(endTouchY - startTouchY);
  });
})();