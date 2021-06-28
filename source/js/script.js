//---------- Кнопка "Наверх" ----------//
let btnToTop = document.querySelector(".back-to-top");
window.onscroll = () => {
  if (window.scrollY > 700) {
    btnToTop.classList.remove("back-to-top--hidden");
  } else {
    btnToTop.classList.add("back-to-top--hidden");
  }
};

btnToTop.addEventListener("click", (evt) => {
  evt.preventDefault();
  window.scrollTo(0, 0);
});

btnToTop.addEventListener("keydown", (evt) => {
  evt.preventDefault();
  if (evt.key === ENTER_KEY) {
    window.scrollTo(0, 0);
  }
});

//---------- Кнопка "Меню" ----------//
let menuButton = document.querySelector(".menu-btn");

let toggleMenu = () => {
  menuButton.classList.toggle("menu-btn--active");
  document.querySelector(".nav__list").classList.toggle("nav__list--active");
}

menuButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  toggleMenu();
});

menuButton.addEventListener("keydown", (evt) => {
  evt.preventDefault();
  if (evt.key === ENTER_KEY || evt.key === ESC_KEY) {
    toggleMenu();
  }
});

//---------- Плавная прокрутка ----------//
// document.querySelectorAll('a[href^="#"').forEach(link => {

//   link.addEventListener('click', function(evt) {
//       evt.preventDefault();

//       let href = this.getAttribute('href').substring(1);

//       const scrollTarget = document.getElementById(href);

//       // const topOffset = document.querySelector('.scrollto').offsetHeight;
//       // const topOffset = 0; // если не нужен отступ сверху
//       const elementPosition = scrollTarget.getBoundingClientRect().top;
//       const offsetPosition = elementPosition; // - topOffset;

//       window.scrollBy({
//           top: offsetPosition,
//           behavior: 'smooth'
//       });
//   });
// });

let  anchorLinks = [].slice.call(document.querySelectorAll("a[href^='#']")),
animationTime = 300,
framesCount = 20;

// let addClickListener = (item) => {
//   item.addEventListener('click', (evt) => {
//     evt.preventDefault();

//     // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
//     let coordItemY = document.getElementById(item.href.match(/#([^ ]*)/)[1]).getBoundingClientRect().top;;
//     //#([^ ]*) означает: найдите символ #, а затем получите все символы до символа колнца строки

//     // запускаем интервал, в котором считаем на сколько скроллить за 1 такт
//     let scroller = setInterval(function() {
//       let scrollByItem = coordItemY / framesCount;

//       // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
//       // и дно страницы не достигнуто
//       if (scrollByItem > window.pageYOffset - coordItemY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
//         // то скроллим на к-во пикселей, которое соответствует одному такту
//         window.scrollBy(0, scrollByItem);
//       } else {
//         // иначе добираемся до элемента и выходим из интервала
//         window.scrollTo(0, coordItemY);
//         clearInterval(scroller);
//       }
//     // время интервала равняется частному от времени анимации и к-ва кадров
//     }, animationTime / framesCount);
//   });
// }

anchorLinks.forEach((item) => {
  // addClickListener(link);
  item.addEventListener('click', (evt) => {
    evt.preventDefault();

    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordItemY = document.getElementById(item.href.match(/#([^ ]*)/)[1]).getBoundingClientRect().top;;
    //#([^ ]*) означает: найдите символ #, а затем получите все символы до символа колнца строки

    // запускаем интервал, в котором считаем на сколько скроллить за 1 такт
    let scroller = setInterval(function() {
      let scrollByItem = coordItemY / framesCount;

      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто
      if (scrollByItem > window.pageYOffset - coordItemY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollByItem);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordItemY);
        clearInterval(scroller);
      }
    // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});
