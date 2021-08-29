let changePhoneAction = () => {
  let phone = document.querySelector(".phone");
  phone.classList.add("button-callback");
  phone.addEventListener("click", (evt) => {
    evt.preventDefault();
  });
}
