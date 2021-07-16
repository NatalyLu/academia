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
