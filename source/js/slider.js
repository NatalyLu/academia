$(document).ready(function(){
  $('.slider').slick({
    speed: 500,
    fade: true,
    easing: 'ease',
    dots: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          autoplay: false,
        }
      },
    ],
  });
});