const button = document.querySelector('.nav__btn');
const dropdown = document.querySelector('.nav__list');

button.addEventListener('click', (e) => {
  e.stopPropagation();

  button.classList.toggle('mobile--active');
  dropdown.classList.toggle('mobile--active');
});

document.addEventListener('click', () => {
  button.classList.remove('mobile--active');
  dropdown.classList.remove('mobile--active');
});

// модальное окно
const modals = document.querySelectorAll('.modal');

document.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-modal')) {
    const modalId = e.target.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    const card = e.target.closest('.review__card');

    if (card) {
      const name = card.querySelector('.review__card-title').textContent;
      const date = card.querySelector('.review__card-data').textContent;
      const text = card.querySelector('.review__card-text').textContent;

      modal.querySelector('.review__card-title').textContent = name;
      modal.querySelector('.review__card-data').textContent = date;
      modal.querySelector('.modal__review-text').textContent = text;
    }
    
    modal.classList.add('modal--active');
  }
});

modals.forEach((modal) => {
  const closeModalButtons = modal.querySelectorAll('.modal__close');

  closeModalButtons.forEach((button) => {
    button.addEventListener('click', () => {
      modal.classList.remove('modal--active');
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('modal--active');
    }
  });
});

// слайдер swiper
if (document.querySelector('.review-swiper')) {
  var swiper = new Swiper(".review-swiper", {
  speed: 450,
  pagination: {
    el: ".review__slider-dots",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 1
  },
  navigation: {
    nextEl: ".review__slider-next",
    prevEl: ".review__slider-prew",
  },
  breakpoints: {
    360: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      grid: {
        rows: 1,
      }
    },

    600: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 15,
      grid: {
        rows: 1,
      }
    },

    900: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 30,
      grid: {
        rows: 2,
        fill: "row",
      }
    }
  }
});
}

// accordion
const accordions = document.querySelectorAll('.accordion');

accordions.forEach(item => {
  const btn = item.querySelector('.accordion__btn');

  btn.addEventListener('click', () => {
    accordions.forEach(el => {
      if(el !== item){
        el.classList.remove('accordion--active');
      }
    });

    item.classList.toggle('accordion--active');
  });

});