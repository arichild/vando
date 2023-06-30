function showPopup(path) {
  $.magnificPopup.open({
    items: { src: path },
    type: 'ajax',
    overflowY: 'scroll',
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    ajax: {
      tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
    },
    callbacks: {
      open: function () {
        setTimeout(function () {
          $('.mfp-wrap').addClass('not_delay');
          $('.white-popup').addClass('not_delay');
        }, 700);
      }
    }
  });
}

$.validator.messages.required = 'Пожалуйста, введите данные';

jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^([а-яё ]+|[a-z ]+)$/i.test(value);
}, "Поле может состоять из букв и пробелов, без цифр");

jQuery.validator.addMethod("phone", function (value, element) {
  if (value.startsWith('+375')) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/i.test(value);
  } else if (value.startsWith('+7')) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/i.test(value);
  } else {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/i.test(value);
  }
}, "Введите полный номер");

if (document.getElementById('phone')) {
  let phone = document.getElementById('phone')

  let phoneMask = IMask(phone, {
    mask: [
      {
        mask: '+{375} (00) 000 00 00',
        startsWith: '375',
        overwrite: true,
        lazy: false,
        placeholderChar: '_',
      },
      {
        mask: '+{7} (000) 000 00 00',
        startsWith: '7',
        overwrite: true,
        lazy: false,
        placeholderChar: '_',
      },
      {
        mask: '0000000000000',
        startsWith: '',
        country: 'unknown'
      }
    ],

    dispatch: function (appended, dynamicMasked) {
      let number = (dynamicMasked.value + appended).replace(/\D/g, '');

      return dynamicMasked.compiledMasks.find(function (m) {
        return number.indexOf(m.startsWith) === 0;
      });
    }
  })
}

window.addEventListener("DOMContentLoaded", () => {
  let btnForm = document.querySelector('.map-contact-btn')

  if(btnForm) {
    let btnClose = document.querySelector('.map-form-close')

    btnForm.addEventListener('click', () => {
      const form = document.querySelector('.map-form')
      const contact = btnForm.closest('.map-contact')
      const parent = contact.closest('.map')
      const bg = document.createElement('div')

      bg.classList.add('bg');

      parent.prepend(bg)

      form.classList.add('active')
      contact.classList.add('hidden')
    })

    btnClose.addEventListener('click', () => {
      const form = btnClose.closest('.map-form')
      const parent = form.closest('.map')
      const contact = parent.querySelector('.map-contact')
      const bg = document.querySelector('.bg')

      form.classList.remove('active')
      contact.classList.remove('hidden')

      bg.remove()
    })
  }


  function blockTo(selector, className) {
    const anchors = document.querySelectorAll(selector)

    if (anchors.length) {
      for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
          e.preventDefault()

          if(selector === '.header-mob-nav a') {
            burgerMenu()
          }

          let target = e.target.closest('a')
          let arr = target.classList;
          let id = Array.from(arr).filter(word => word == className)

          if(id.length) {
            document.getElementById(id[0]).scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
        })
      }
    }
  }

  blockTo('.ui-more a', "more-trade")

  blockTo('.header-menu ul a', "delivery")
  blockTo('.header-menu ul a', "more-trade")
  blockTo('.header-menu ul a', "contact")

  blockTo('.header-mob-nav a', "more-trade")
  blockTo('.header-mob-nav a', "delivery")
  blockTo('.header-mob-nav a', "contact")

  const animateText = document.querySelector('.basic-text')

  if (animateText) {
    const v = document.getElementById("v");
    const a = document.getElementById("a");
    const n = document.getElementById("n");
    const d = document.getElementById("d");
    const o = document.getElementById("o");

    gsap.set([n, a, v, d, o], {autoAlpha: 0});

    gsap.set(a, {xPercent: +100});
    gsap.set(d, {xPercent: -100});
    gsap.set(v, {xPercent: +200});
    gsap.set(o, {xPercent: -200});

    gsap.to(n, {duration: 1, autoAlpha: 1});

    gsap.to([a], {duration: 1, autoAlpha: 1, xPercent: 0, stagger: 0.2, delay: 1});

    gsap.to([d], {duration: 1, autoAlpha: 1, xPercent: 0, stagger: 0.2, delay: 1});

    gsap.to([v], {duration: 1, autoAlpha: 1, xPercent: 0, stagger: 0.2, delay: 1.5});

    gsap.to([o], {duration: 1, autoAlpha: 1, xPercent: 0, stagger: 0.2, delay: 1.5});
  }

  const burger = document.querySelector('.header-mob-burger')

  if(burger) {
    burger.addEventListener('click', burgerMenu)

    function burgerMenu() {
      const burgerMenu = document.querySelector('.header-mob-menu')

      burger.classList.toggle('active')
      burgerMenu.classList.toggle('active')
    }
  }
})
