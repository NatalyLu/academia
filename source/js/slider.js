$(document).ready(function(){
  $('.slider').slick({
    speed: 700,
    fade: true,
    easing: 'ease',
    dots: false,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          autoplay: false,
          dots: true,
        }
      },
    ],
  });
});
