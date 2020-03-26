window.onload = function () {
  addNavigationClickHandler();
  addPhoneClickHandler();
  addTagClickHandler();
  addImagePortfolioClickHandler();
  addSubmitHandler();
  prevSlideClickHandler();
  nextSlideClickHandler();  
  mobileNavigationClickHandler();
  menuItemClickHandler();
}

function addNavigationClickHandler() {
  const navigation = document.getElementById('navigation');  
  navigation.addEventListener('click', (e) => {
    const {target} = e;    
    if (target.classList.contains('navigation__link')) {
        navigation.querySelector('.active-menu').classList.remove('active-menu');
        target.classList.add('active-menu');       
      target.classList.add('active-menu');
        target.classList.add('active-menu');       
    }    
  })
}

document.addEventListener('scroll', onScroll);


function onScroll() {
  const navigationLinks = document.querySelectorAll('.navigation__link');
  const SCROLL_COMPENSATION = 100;
  const currentPosition = window.scrollY + SCROLL_COMPENSATION;
  document.querySelectorAll('section').forEach((el) => {
    if (el.offsetTop <= currentPosition && (el.offsetTop + el.offsetHeight) > currentPosition) {
      navigationLinks.forEach((a) => {
        a.classList.remove('active-menu');
        if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
          a.classList.add('active-menu');
        };           
      });
    }
  });
}

function addPhoneClickHandler() {
  const sliderImage = document.querySelector('.slider__image');
  sliderImage.addEventListener('click', (e) => {
    const {parentNode} = e.target;
    if (!e.target.classList.contains('phone__shadow')) {
      if (parentNode.classList.contains('phone_off')) {
        parentNode.classList.remove('phone_off');
      } else parentNode.classList.add('phone_off');
    }
  })
};

function addTagClickHandler() {
  const tags = document.querySelector('.portfolio-tags');
  tags.addEventListener('click', (e) => {
    const {target} = e;
    if (target.classList.contains('portfolio-tags__button')) {
      tags.querySelector('.active-tag').classList.remove('active-tag');
      target.classList.add('active-tag');
      randomAppendImages();
    }
  });
}

const portfolioImagesGroup = document.querySelector('.columns-4');

function randomAppendImages() {
  const portfolioImage = document.querySelectorAll('.columns-4 li');
  Array.from(portfolioImage).sort(() => Math.random() - 0.5).forEach(item => portfolioImagesGroup.append(item));  
}

function addImagePortfolioClickHandler() {
  portfolioImagesGroup.addEventListener('click', (e) => {
    const {target} = e;
    if (target.classList.contains('portfolio__image')) {
      if (portfolioImagesGroup.querySelector('.active-image')) {
        portfolioImagesGroup.querySelector('.active-image').classList.remove('active-image');
        target.classList.add('active-image');
      } else target.classList.add('active-image');       
    }
  })
}

function addSubmitHandler() {
  const form = document.querySelector('.form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    createModalWindow();
  })
}

function createModalWindow() {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  const modal = document.createElement('div');
  modal.classList.add('modal');
  const content = document.createElement('div');
  content.classList.add('modal__content');
  contentGenerate(content);
  const closeButton = document.createElement('button');
  closeButton.classList.add('button_close');
  closeButton.innerHTML = 'Ok';
  closeButton.addEventListener('click', closeModalWindow)
  modal.append(content);
  modal.append(closeButton);
  overlay.append(modal);
  document.body.append(overlay);
  document.body.classList.add('scroll-hidden');
}

function contentGenerate(element) {  
  let topic = 'Без темы';
  let description = 'Без описания';
  const inputSubject = document.getElementById('inputSubject').value;
  const inputDescription = document.getElementById('inputDetail').value;
  if (inputSubject !== '') {
    topic = `Тема: ${inputSubject}`;
  }
  if (inputDescription !== '') {
    description = `Описание: ${inputDescription}`;
  }
  element.innerHTML = `<h3 class='modal__title'>Письмо отправлено</h3>  
    <p>${topic}</p>  
    <p>${description}</p>`;
}

function closeModalWindow(e) {
  let classes = e.target.classList;
  if(classes.contains('overlay') || classes.contains('button_close')) {
    document.querySelector('.overlay').remove();
    document.body.classList.remove('scroll-hidden');
    cleanForm();
  }  
}

function cleanForm() {
  const inputs = document.querySelectorAll('.form__input');
  Array.from(inputs).forEach(input => input.value = '');
}

const slideWidth = 940;
const sliderList = document.querySelector('.slider__list');
const sliderSection = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider__image');
let position = 0;



function prevSlideClickHandler() {
  const prevSlide = document.querySelector('.slider-arow_prev');
  prevSlide.addEventListener('click', scrollToPrev);
}

function nextSlideClickHandler() {
  const nextSlide = document.querySelector('.slider-arow_next');
  nextSlide.addEventListener('click', scrollToNext);
}

function scrollToNext() {
  event.preventDefault();
  position--;

  if (position < 0) {
    let children = sliderList.children;
    sliderList.style.transition = null;
    sliderList.style.left = -(position + 2) * slideWidth + 'px';
    sliderList.insertBefore(children[slides.length - 1], children[0]);
    children[0].offsetParent;
    position++;
  }

  sliderList.style.transition = 'left 0.6s ease-in-out';
  sliderList.style.left = -(slideWidth * position) + 'px';
  addClass(sliderSection,'slider_blue');
}

function scrollToPrev() {
  event.preventDefault();
  if (position === 0) {
    let children = sliderList.children;
    sliderList.style.transition = null;
    sliderList.style.left = -(position - 2) * slideWidth + 'px';
    sliderList.appendChild(children[0]);
    children[0].offsetParent;
    position++;
  }
  
  position++;
  
  if (position > slides.length - 1) {
    let children = sliderList.children;
    sliderList.style.transition = null;
    sliderList.style.left = -(position - 2) * slideWidth + 'px';
    sliderList.appendChild(children[0]);
    children[0].offsetParent;
    position--;
  }

  sliderList.style.transition = 'left 0.6s ease-in-out';
  sliderList.style.left = -(slideWidth * position) + 'px';
  addClass(sliderSection,'slider_blue');
}

function addClass(element, classElement) {
  if (element.classList.contains(classElement)) {
    element.classList.remove(classElement);
  } else element.classList.add(classElement);
};

const navigation = document.querySelector('.header__navigation');
const mobileNav = document.querySelector('.mobile-navigation');
const mobileOverlay = document.querySelector('.mobile-navigation__overlay');

function mobileNavigationClickHandler() {
  mobileNav.addEventListener('click', (e) => {
    const {target} = e;
    addClass(target.parentNode, 'active');
    addClass(mobileOverlay, 'active');
    addClass(navigation, 'navigation_mobile')
  })
}

function menuItemClickHandler() {
  const header = document.querySelector('.header__wrapper');
  header.addEventListener('click', (e) => {
  const {target} = e;
  if (target.classList.contains('navigation__link') || target.classList.contains('mobile__navigation') ) {
    addClass(mobileOverlay, 'active');
    addClass(mobileNav, 'active');
    addClass(navigation, 'navigation_mobile')
  }
  })
}
