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
