//---------- Работа с попапом ----------//
(function () {
  let html = document.getElementById("html");
  let activeElement = document.getElementById("call-popup");
  let closeButton = activeElement.querySelector(".form__close");
  let targetItems = document.querySelectorAll(".button-callback");
  let form = activeElement.querySelector(".form");
  let fields = form.querySelectorAll(".form__field");
  let firstPage = form.querySelector(".form__first-page");
  let secondPage = form.querySelector(".form__second-page");

  // ************************
  // Открытие/закрытие формы
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
    // Если была открыта 2 "страница" формы, то прячем их
    // Класс отвечающщий за скрытие первой страницы уберем при открытии попапа, чтобы анимация исчезновения не пострадала
    secondPage.classList.remove("open");
    activeElement.classList.remove("popup--active");
    closeButton.removeEventListener("click", closePopup);
    closeButton.removeEventListener("keydown", closePopupKeyDown);
    window.removeEventListener("keydown", closeEsc);
    // Отмена запрета скрола страницы
    html.classList.remove("lock");
  }

  let openPopup = (evt) => {
    evt.preventDefault();
    // Если была открыта 2 "страница" формы, то нужно убрать с первой страницы класс её закрытия
    if (firstPage.classList.contains("close")) {
      firstPage.classList.remove("close");
    }
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


  // ************************
  // Обработка формы
  let addError = (field) => {
    field.classList.add("error");
  }

  let removeError = (field) => {
    field.classList.remove("error");
  }

  let checkPhone = (input) => {
    return ((input.value !== "") && (/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(input.value)));
  }

  let checkTextInput = (input) => {
    return ((input.value == "") || (/([а-я]+)/ui.test(input.value)));
  }

  let checkValidate = (form) => {
    let formReq = form.querySelectorAll("input");
    let error = 0;

    [].slice.call(formReq).forEach(item => {
      if (item.getAttribute("type") === "tel") {
        if (!checkPhone(item)) {
          addError(item.parentElement);
          error++;
        }
      } else if (item.getAttribute("type") === "text"){
        if (!checkTextInput(item)){
          addError(item.parentElement);
          error++;
        }

      }
    });
    return(error);
  }

  let sendFormData = (evt) => {
    evt.preventDefault();
    let errors = checkValidate(form);
    let formData = new FormData(form);

    // Если нет ошибок при заполнении и отправка прошла успешно(файл telegram.php вернет успешный ответ),
    // то очистим форму, закроем её и выведем сообщение об успешной отправке
    if (errors === 0) {
      // Если отправка будет занимать какое-то время, то выведем изображение загрузки
      activeElement.classList.add("sending");

      let response = async () => {
        await fetch(form.getAttribute("action"), {
          method: form.getAttribute("method"),
          body: formData
        });
      }

      if (response.ok) {
        // Чистим форму
        form.reset();
        // Убираем картинку загрузки
        activeElement.classList.remove("sending");
        // Показываем 2 страницу формы
        firstPage.classList.add("close");
        secondPage.classList.add("open");
      } else {
        // Чистим форму
        form.reset();
        // Убираем картинку загрузки
        activeElement.classList.remove("sending");
        // Меняем контент на второй странице
        secondPage.querySelector(".form__title").innerHTML = "Ошибка";
        secondPage.querySelector(".form__description").innerHTML = "Сбой при отправке формы. Пожалуйста, попробуйте отправить данные позднее.";
        // Скрываем первую страницу и показываем страницу формы с ошибкой
        firstPage.classList.add("close");
        secondPage.classList.add("open");
      }
    }
  }

  // Если поле ввода было не валидным (=> содержит класс error), то при измененнии данных в нем убираем класс error
  [].slice.call(fields).forEach(field => {
    field.addEventListener("input", () => {
      if (field.classList.contains("error")) {
        removeError(field);
      }
    });
  });

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    sendFormData(evt);
  });
})();
