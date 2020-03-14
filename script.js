window.onload = function () {
  addNavigationClickHandler();
  addPhoneClickHandler();
  addTagClickHandler();
  addImagePortfolioClickHandler();
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