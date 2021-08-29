const mediaQuery = window.matchMedia('(min-width: 768px)')
function handleTabletChange(evt) {
  if (evt.matches) {
    console.log('Media Query Matched!')
    changePhoneAction();
  }
}
mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);
