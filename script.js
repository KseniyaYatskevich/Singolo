window.onload = function () {
  addNavigationClickHandler();
  addPhoneClickHandler();
  addTagClickHandler();
  addImagePortfolioClickHandler();
  addSubmitHandler();
  mobileNavigationClickHandler();
  menuItemClickHandler();
  prevSlideClickHandler();
  nextSlideClickHandler();
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

function addClass(element, classElement) {
  if (element.classList.contains(classElement)) {
    element.classList.remove(classElement);
  } else element.classList.add(classElement);
};

const navigation = document.querySelector('.header__navigation');
const mobileNav = document.querySelector('.mobile-navigation');
const mobileOverlay = document.querySelector('.mobile-navigation__overlay');
const logo = document.querySelector('.logo__title');

function mobileNavigationClickHandler() {
  mobileNav.addEventListener('click', (e) => {
    const {target} = e;
    addClass(target.parentNode, 'active');
    addClass(mobileOverlay, 'active');
    addClass(logo, 'logo__title_mobile');
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

const slides = document.querySelectorAll('.slider__image');
const section = document.querySelector('.slider');
let currentSlide = 0;
let isEnabled = true;

function changeCurrentSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
}

function hideSlide(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('slide_active', direction);
  });
}

function showSlide(direction) {
  slides[currentSlide].classList.add('slide_next', direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('slide_next', direction);
    this.classList.add('slide_active');
    isEnabled = true;
  });
}

function nextSlide(n) {
  hideSlide('to-right');
  changeCurrentSlide(n - 1);
  showSlide('from-left');
  addClass(section, 'slider_blue');
}

function previousSlide(n) {
  hideSlide('to-left');
  changeCurrentSlide(n + 1);
  showSlide('from-right');
  addClass(section, 'slider_blue');
}

function prevSlideClickHandler() {
  document.querySelector('.slider-arow_prev').addEventListener('click', function() {
    if (isEnabled) {
      previousSlide(currentSlide);
    }
  });
}

function nextSlideClickHandler() {
  document.querySelector('.slider-arow_next').addEventListener('click', function() {
    if (isEnabled) {
      nextSlide(currentSlide);
    }
  });
}


