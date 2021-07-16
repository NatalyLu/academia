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

//---------- Плавное появление обьектов ----------//
// У каждого обьекта с классом animation-items при достижении скролом 1/4 его высоты
// или 1/4 высоты окна браузера, если высота обьекта больше, чем окно браузера, ему добавляется класс animation-apear--active.
// Если не докрутили или перекрутили, то класс снимаем
let elementApear = (targetClass, activeClass) => {
  let  animationItems = document.querySelectorAll(targetClass);
  let offsetElement = (element) => {
    const rect = element.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  };

  if (animationItems.length > 0) {
    let apearAnimation = (params) => {
      [].slice.call(animationItems).forEach((item) => {
        const itemHeight = item.offsetHeight;
        // позиция обьекта относительно верха страницы ( на сколько обьект находится ниже верха стр)
        const itemOffset = offsetElement(item).top;
        const itemStart = 4;

        let itemPoint = window.innerHeight - itemHeight / itemStart;

        // если элемент выше окна браузера
        if (itemHeight > window.innerHeight) {
          itemPoint = window.innerHeight - window.innerHeight / itemStart
        }

        // pageYOffset переменная в которую поступают данные о кол-ве проскроленных пикселей
        // если мы прокрутили больше, чем позиция обьекта - точка старта, но при этом меньше чем позиция обьекта + его высота
        if ((pageYOffset > itemOffset -  itemPoint) && (pageYOffset < itemOffset + itemHeight)) {
          item.classList.add(activeClass);
        } else {
          item.classList.remove(activeClass)
        }
      });
    }
    // для воспроизведения анимации сразу, так как для первого блока с анимацией скролл не требуется
    setTimeout(() => {
      apearAnimation();
    }, 300);

    window.addEventListener("scroll", apearAnimation);
  }
}

// Применяем анимацию сразу при загрузке страницы только к первому блоку (чтобы избежать моргания)
elementApear(".animation-apear--first-block", "animation-apear--active-first-block");

// Исключаем анимацию для узких устройств
if (document.documentElement.clientWidth > 768) {
  // Для остальных блоков, если скрипты подгрузятся, то сначала скрываем, а затем анимируем нужные элементы
  [].slice.call(document.querySelectorAll(".animation-apear--element")).forEach((element) => {
    element.classList.add("animation-apear--hide-elem");
  })
  setTimeout(elementApear(".animation-apear", "animation-apear--active"), 500);
}
