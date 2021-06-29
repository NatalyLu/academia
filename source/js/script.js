//---------- Кнопка "Наверх" ----------//
(function () {
  let btnToTop = document.querySelector(".back-to-top");
  window.onscroll = () => {
    if (window.scrollY > 700) {
      btnToTop.classList.remove("back-to-top--hidden");
    } else {
      btnToTop.classList.add("back-to-top--hidden");
    }
  };
})();

//---------- Кнопка "Меню" ----------//
(function () {
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
})();

//---------- Плавная прокрутка ----------//
(function () {
  let  anchorLinks = [].slice.call(document.querySelectorAll("a[data-anchor-link='anchor-link']"));

  let addClickListener = (item) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      let element = document.getElementById(item.href.match(/#([^ ]*)/)[1]);
      let offset = 0;
      $('html, body').animate({
          scrollTop: $(element).offset().top - offset
      }, 1000);
      return false;
    });
  }

  anchorLinks.forEach((link) => {
    addClickListener(link);
  });
})();
