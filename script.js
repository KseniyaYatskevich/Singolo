window.onload = function () {
  addNavigationClickHandler();
  addPhoneClickHandler();
  addTagClickHandler();
  addImagePortfolioClickHandler();
  addSubmitClickHandler();
  prevSlideClickHandler();
  nextSlideClickHandler();  
}

const addNavigationClickHandler = () => {
  const navigation = document.getElementById('navigation');
  navigation.addEventListener('click', (e) => {
    const {target} = e;
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
    if (!e.target.classList.contains('phone__shadow')) {
      if (parentNode.classList.contains('phone_off')) {
        parentNode.classList.remove('phone_off');
      } else parentNode.classList.add('phone_off');
    }
  })
};

const addTagClickHandler = () => {
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

const randomAppendImages = () => {
  const portfolioImage = document.querySelectorAll('.portfolio__image');
  Array.from(portfolioImage).sort(() => Math.random() - 0.5).forEach(item => portfolioImagesGroup.append(item));  
}

const addImagePortfolioClickHandler = () => {
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

const addSubmitClickHandler = () => {
  const buttonsubmit = document.querySelector('.form__button');
  buttonsubmit.addEventListener('click', (e) => {
    e.preventDefault();
    createModalWindow();
  })
}

const createModalWindow = () => {
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
  validationFormCheck(overlay);
}

function validationFormCheck(appendNode) {
  const nameInput = document.getElementById('inputName');
  const mailInput = document.getElementById('inputEmail');
  const invalidNamemessage = document.querySelector('.valid-name');
  const invalidMailMessage = document.querySelector('.valid-mail');
  if (!nameInput.checkValidity()) {
    invalidNamemessage.classList.remove('valid-name_none');
  } else invalidNamemessage.classList.add('valid-name_none');
  if (!mailInput.checkValidity()) {
    invalidMailMessage.classList.remove('valid-mail_none');
  } else invalidMailMessage.classList.add('valid-mail_none');
  if (nameInput.checkValidity() && mailInput.checkValidity()) {
    document.body.append(appendNode);
  } 
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
    cleanForm();
  }  
}

const cleanForm = () => {
  const inputs = document.querySelectorAll('.form__input');
  Array.from(inputs).forEach(input => input.value = '');
}

const slideWidth = 900;
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
    const children = sliderList.children;
    sliderList.style.transition = null;
    sliderList.style.left = -(position + 2) * slideWidth + 'px';
    sliderList.insertBefore(children[slides.length - 1], children[0]);
    children[0].offsetParent;
    position++;
  }
  sliderList.style.transition = 'left 0.8s ease-in';
  sliderList.style.left = -(slideWidth * position) + 'px';
  addClass(sliderSection, 'slider_blue');
}


function scrollToPrev() {
  event.preventDefault();
  position++;
  if (position > slides.length - 1) {
    const children = sliderList.children;
    sliderList.style.transition = null;
    sliderList.style.left = -(position - 2) * slideWidth + 'px';
    sliderList.appendChild(children[0]);
    children[0].offsetParent;
    position--;
  }
  sliderList.style.transition = 'left 0.8s ease-in';
  sliderList.style.left = -(slideWidth * position) + 'px';
  addClass(sliderSection,'slider_blue');
}

function addClass(element, classElement) {
  if (element.classList.contains(classElement)) {
    element.classList.remove(classElement);
  } else element.classList.add(classElement);
};