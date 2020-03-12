const navigation = document.getElementById('navigation');

navigation.addEventListener( 'click', (e) => {
  navigation.querySelector('.active-menu').classList.remove('active-menu');
  e.target.classList.add('active-menu');
})