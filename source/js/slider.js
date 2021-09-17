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

$('#slider-office').slick({
  speed: 700,
  centerMode: true,
  centerPadding: '60px',
  // autoplay: true,
  // autoplaySpeed: 2000,
  lazyLoad: 'ondemand',
  arrows: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    // {
    //   breakpoint: 768,
    //   settings: {
    //     arrows: false,
    //     centerMode: true,
    //     centerPadding: '20px',
    //     slidesToShow: 3
    //   }
    // },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        slidesToShow: 1
      }
    }
  ]
});
