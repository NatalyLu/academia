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

//---------- Плавное появление обьектов ----------//
// У каждого обьекта с классом animation-items при достижении скролом 1/4 его высоты
// или 1/4 высоты окна браузера, если высота обьекта больше, чем окно браузера, ему добавляется класс animation-apear--active.
// Если не докрутили или перекрутили, то класс снимаем
let elementApear = () => {
  let  animationItems = document.querySelectorAll(".animation-apear");
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
          item.classList.add("animation-apear--active");
        } else {
          item.classList.remove("animation-apear--active")
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

if (document.documentElement.clientWidth > 768) {
  elementApear();
}

// if ( $(window).width() >= 768 ) {
//   elementApear();
// }
