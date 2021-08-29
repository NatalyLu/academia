(function () {
  let extraToggle = () => {
    document.querySelector(".nav__list").classList.toggle("nav__list--active");
  }
  toggleElement (".menu-btn", false, "menu-btn--active", extraToggle);
})();
