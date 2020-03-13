window.onload = function () {
  addNavigationClickHandler();
}

const addNavigationClickHandler = () => {
  const navigation = document.getElementById('navigation');
  navigation.addEventListener( 'click', (e) => {
    const target = e.target;
    if(target.classList.contains('navigation__link')) {
      navigation.querySelector('.active-menu').classList.remove('active-menu');
      target.classList.add('active-menu');
    }
  })
}