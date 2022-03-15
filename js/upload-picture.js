const form = document.querySelector('.img-upload__form');

new Pristine(form);
const pristine = new Pristine(form, {
  classTo: 'input-label',
  errorTextParent: 'input-label',
  errorTextClass: 'input-label__error-text',
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});
