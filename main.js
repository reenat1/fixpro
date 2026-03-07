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


document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".contact-form");
  const successModal = document.getElementById("modal-form");

  forms.forEach(form => {
    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const phoneInput = form.querySelector('[data-phone]');
    const questionInput = form.querySelector('[name="question"]');

    function setError(input){
      input.classList.add("is-error");
      input.classList.remove("is-valid");
    }

    function setSuccess(input){
      input.classList.remove("is-error");
      input.classList.add("is-valid");
    }

    function clearState(input){
      input.classList.remove("is-error");
      input.classList.remove("is-valid");
    }

    function formatPhone(value){
      let numbers = value.replace(/\D/g,'');

      if(!numbers) return '';

      if(numbers[0] === '8') numbers = '7' + numbers.slice(1);
      if(numbers[0] === '9') numbers = '7' + numbers;

      numbers = numbers.substring(0,11);
      let result = '+7 ';

      if(numbers.length > 1){
        result += '(' + numbers.substring(1,4);
      }

      if(numbers.length >=5){
        result += ') ' + numbers.substring(4,7);
      }

      if(numbers.length >=8){
        result += '-' + numbers.substring(7,9);
      }

      if(numbers.length >=10){
        result += '-' + numbers.substring(9,11);
      }

      return result;
    }

      phoneInput.addEventListener("input",(e)=>{
      e.target.value = formatPhone(e.target.value);
      validatePhone();
  });

    function validateName(){
      const value = nameInput.value.trim();
      const reg = /^[A-Za-zА-Яа-яЁё\s-]{2,}$/;

      if(!reg.test(value)){
        setError(nameInput);
        return false;
      }

      setSuccess(nameInput);
      return true;
    }

    function validateEmail(){
      const value = emailInput.value.trim();
      const reg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if(!reg.test(value)){
        setError(emailInput);
        return false;
      }

      setSuccess(emailInput);
      return true;
    }

    function validatePhone(){
      const numbers = phoneInput.value.replace(/\D/g,'');

      if(numbers.length !== 11 || numbers[0] !== '7'){
        setError(phoneInput);
        return false;
      }

      setSuccess(phoneInput);
      return true;
    }

    function validateQuestion(){
      const value = questionInput.value.trim();

      if(value.length < 5){
        setError(questionInput);
        return false;
      }

      setSuccess(questionInput);
      return true;
    }

    nameInput.addEventListener("input",validateName);
    emailInput.addEventListener("input",validateEmail);
    questionInput.addEventListener("input",validateQuestion);

    form.addEventListener("submit",(e)=>{
      e.preventDefault();

      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isQuestionValid = validateQuestion();

      if(!(isNameValid && isEmailValid && isPhoneValid && isQuestionValid)){
        return;
      }

      if(successModal){
        successModal.classList.add("modal--active");
      }

      form.reset();

      [nameInput,emailInput,phoneInput,questionInput].forEach(clearState);
    });
  });
});