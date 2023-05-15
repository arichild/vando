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

  $.validator.messages.required = 'Пожалуйста, введите данные';

  jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^([а-яё ]+|[a-z ]+)$/i.test(value);
  }, "Поле может состоять из букв и пробелов, без цифр");

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

  const anchors = document.querySelectorAll('.ui-more a')

  function blockTo(className) {
    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()

        let target = e.target.closest('a')
        let arr = target.classList;
        let id = Array.from(arr).filter(word => word == className)

        document.getElementById(id[0]).scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      })
    }
  }

  if (anchors.length) {
    blockTo("more-trade")
  }
})