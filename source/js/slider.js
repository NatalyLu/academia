$(document).ready(function(){
  $('#slider').slick({
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

$('#office-slider').slick({
  dots: true,
  arrows: true,
  autoplay: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
  ],
});
