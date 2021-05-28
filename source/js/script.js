      //------------- Карта ---------------//
      let mapLink = document.querySelector(".contacts__map-button");
      let mapPopup = document.querySelector(".modal-map");
      let mapClose = mapPopup.querySelector(".modal__close-map");

      mapLink.addEventListener("click", function (evt) {
        evt.preventDefault();
        mapPopup.classList.add("modal-show");
        btnToTop.classList.add('back-to-top--hidden');
      });

      mapClose.addEventListener("click", function (evt) {
        evt.preventDefault();
        mapPopup.classList.remove("modal-show");
        btnToTop.classList.remove('back-to-top--hidden');
      });

      window.addEventListener("keydown", function (evt) {
        evt.preventDefault();
        if (evt.keyCode === 27) {
          if (mapPopup.classList.contains("modal-show")) {
            mapPopup.classList.remove("modal-show");
            btnToTop.classList.remove('back-to-top--hidden');
          }
        }
      });

      //---------- Кнопка "Наверх" ----------//
      let btnToTop = document.querySelector(".back-to-top");
      window.onscroll = () => {
        if (window.scrollY > 700) {
          btnToTop.classList.remove('back-to-top--hidden');
        } else {
          btnToTop.classList.add('back-to-top--hidden');
        }
      };

      btnToTop.addEventListener("click", function (evt) {
        evt.preventDefault();
        window.scrollTo(0, 0);
      });

      //---------- Кнопка "Меню" ----------//
      let menuButton = document.querySelector(".menu-btn");
      menuButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        menuButton.classList.toggle("menu-btn--active");
        document.querySelector(".nav__list").classList.toggle("nav__list--active");
      });
