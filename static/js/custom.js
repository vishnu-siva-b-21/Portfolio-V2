(function ($) {
  "use strict";
  $(window).load(function () {
    $(".preloader").fadeOut(1000); // set duration in brackets
  });
  $(".custom-link").click(function () {
    var el = $(this).attr("href");
    var elWrapped = $(el);
    var header_height = $(".navbar").height() + 10;

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $("body,html").animate(
        {
          scrollTop: totalScroll,
        },
        300
      );
    }
  });
})(window.jQuery);

//experience
document.addEventListener("DOMContentLoaded", function () {
  let activeSwiper = null;
  document.querySelectorAll(".swiper-container").forEach((container) => {
    let swiper = new Swiper(container, {
      loop: true,
      autoplay: false,
      navigation: false,
      allowTouchMove: window.innerWidth <= 768,
    });
    container.addEventListener("mouseenter", () => {
      swiper.autoplay.start();
      activeSwiper = swiper;
    });
    container.addEventListener("mouseleave", () => {
      swiper.autoplay.stop();
      activeSwiper = null;
    });
  });
  document.addEventListener("keydown", (event) => {
    if (activeSwiper) {
      if (event.key === "ArrowRight") {
        activeSwiper.slideNext();
      } else if (event.key === "ArrowLeft") {
        activeSwiper.slidePrev();
      }
    }
  });
});

$(document).ready(function () {
  //typing animation
  var typed = new Typed(".typing", {
    strings: ["Developer", "Student", "Designer", "Freelancer"],
    typeSpeed: 80,
    backSpeed: 60,
    loop: true,
  });

  // slide-up script
  $(window).scroll(function () {
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
    $("html").css("scrollBehavior", "auto");
  });
});

// Slider functionality for projects
$(document).ready(function () {
  const $wrapper = $(".slider-wrapper");
  const $item = $(".project-item");

  function getItemWidth() {
    return $item.outerWidth(true) + 10;
  }
  let keyHoldInterval = null;
  let scrollSpeed = 1;

  function startScrolling(direction) {
    scrollSpeed = 1;
    keyHoldInterval = setInterval(() => {
      const scrollAmount = getItemWidth() * scrollSpeed;
      if (direction === "right") {
        $wrapper[0].scrollLeft += scrollAmount;
      } else if (direction === "left") {
        $wrapper[0].scrollLeft -= scrollAmount;
      }
      scrollSpeed = Math.min(scrollSpeed + 0.4, 5); // cap speed
    }, 100);
  }

  function stopScrolling() {
    clearInterval(keyHoldInterval);
    keyHoldInterval = null;
    scrollSpeed = 1;
  }

  $(document).on("keydown", function (e) {
    if (!keyHoldInterval) {
      if (e.key === "ArrowRight") startScrolling("right");
      else if (e.key === "ArrowLeft") startScrolling("left");
    }
  });

  $(document).on("keyup", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") stopScrolling();
  });

  $wrapper.swipe({
    swipe: function (event, direction) {
      const scrollAmount = getItemWidth();
      if (direction === "left") {
        $wrapper[0].scrollLeft += scrollAmount;
      } else if (direction === "right") {
        $wrapper[0].scrollLeft -= scrollAmount;
      }
    },
    threshold: 50,
  });
});
