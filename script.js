window.onload = function () {
  addNavigationClickHandler();
  addPhoneClickHandler();
}

const addNavigationClickHandler = () => {
  const navigation = document.getElementById('navigation');
  navigation.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('navigation__link')) {
      navigation.querySelector('.active-menu').classList.remove('active-menu');
      target.classList.add('active-menu');
    }
  })
}

const addPhoneClickHandler = () => {
  const sliderImage = document.querySelector('.slider__image');
  sliderImage.addEventListener('click', (e) => {
    const {parentNode} = e.target;
    if (parentNode.classList.contains('phone_off')) {
      parentNode.classList.remove('phone_off');
    } else parentNode.classList.add('phone_off')
  })
};
