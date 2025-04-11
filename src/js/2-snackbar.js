import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(form);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  createPromise(delay, state)
    .then(ms => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Promise in ${ms}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch(ms => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Promise in ${ms}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    });

  form.reset();
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}