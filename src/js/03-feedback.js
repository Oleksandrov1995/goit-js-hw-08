import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

form.addEventListener(
  'input',
  throttle(event => {
    const objectToSave = { email: email.value, message: message.value };
    localStorage.setItem('feedback-form-state', JSON.stringify(objectToSave));
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log({ email: email.value, message: message.value });
  form.reset();
  localStorage.removeItem('feedback-form-state');
});

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const storageData = load('feedback-form-state');
if (storageData) {
  email.value = storageData.email;
  message.value = storageData.message;
}
