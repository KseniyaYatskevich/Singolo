window.onload = function () {
  addNavigationClickHandler();
  addPhoneClickHandler();
  addTagClickHandler();
  addImagePortfolioClickHandler();
  addSubmitClickHandler();
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
  if (document.getElementById('inputName').value && document.getElementById('inputEmail').value) {
    document.body.append(overlay);
  }
  
}

function contentGenerate(element) {  
  let topic = 'Без темы';
  let description = 'Без описания';
  const inputSubject = document.getElementById('inputSubject').value;
  const inputDescription = document.getElementById('inputDetail').value;
  if (inputSubject.toUpperCase() === 'SINGOLO') {
    const topicValue = `${inputSubject[0].toUpperCase() + inputSubject.slice(1).toLowerCase()}`;
    topic = `Тема: ${topicValue}`;
  }
  if (inputDescription.toUpperCase() === 'PORTFOLIO PROJECT') {
    const descrictionValue = `${inputDescription[0].toUpperCase() + inputDescription.slice(1).toLowerCase()}`;
    description = `Описание: ${descrictionValue}`;
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

