//---------- Константы ----------//
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE
  };
})();

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
  let extraToggle = () => {
    document.querySelector(".nav__list").classList.toggle("nav__list--active");
  }
  toggleElement (".menu-btn", false, "menu-btn--active", extraToggle);
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

//---------- Работа с попапом ----------//
(function () {
  let html = document.getElementById("html");
  let activeElement = document.getElementById("call-popup");
  let closeButton = activeElement.querySelector(".form__close");
  let targetItems = document.querySelectorAll(".contact-us__button");

  let closePopupKeyDown = (evt) => {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closePopup(evt);
    }
  }

  let closeEsc = (evt) => {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup(evt);
    }
  }

  let closePopup = (evt) => {
    evt.preventDefault();
    activeElement.classList.remove("popup--active");
    closeButton.removeEventListener("click", closePopup);
    closeButton.removeEventListener("keydown", closePopupKeyDown);
    window.removeEventListener("keydown", closeEsc);
    // Отмена запрета скрола страницы
    html.classList.remove("lock");
  }

  let openPopup = (evt) => {
    evt.preventDefault();
    activeElement.classList.add("popup--active");
    closeButton.addEventListener("click", closePopup);
    closeButton.addEventListener("keydown", closePopupKeyDown);
    window.addEventListener("keydown", closeEsc);
    // Запрет скрола страницы
    html.classList.add("lock");
  }

  [].slice.call(targetItems).forEach(item => {
    item.addEventListener("click", (evt) => {
      openPopup(evt);
    });
  });

  [].slice.call(targetItems).forEach(item => {
    item.addEventListener("keydown", (evt) => {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        openPopup(evt);
      }
    });
  });
})();
