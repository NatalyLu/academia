//---------- Смена класса по клику/нажатию на esc или enter ----------//
let toggleElement = (targetClass, activeElement, activeClass, extraFunction) => {
  let targetItems = document.querySelectorAll(targetClass);

  let toggleClass = (el) => {
    el.classList.toggle(activeClass);
    extraFunction();
  }

  [].slice.call(targetItems).forEach(item => {
    item.addEventListener("click", (evt) => {
      evt.preventDefault();
      activeElement ? toggleClass(activeElement) : toggleClass(item);
    });
  });

  [].slice.call(targetItems).forEach(item => {
    item.addEventListener("keydown", (evt) => {
      evt.preventDefault();
      if (evt.keyCode === window.util.ENTER_KEYCODE || evt.keyCode === window.util.ESC_KEYCODE) {
        activeElement ? toggleClass(activeElement) : toggleClass(item);
      }
    });
  });
};
