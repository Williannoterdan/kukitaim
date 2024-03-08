import iziToast from 'izitoast';

iziToast.settings({
  timeout: 10000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  onOpening: function () {
    console.log('callback abriu!');
  },
  onClosing: function () {
    console.log('callback fechou!');
  },
});

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
    event.preventDefault();
    console.log("sas");
    console.log(event.target.state.value);
    let elem = event.target.state.value;
    let taim = event.target.delay.value;
    form.reset();
    new Promise((resolve, reject) => {
      setTimeout(() => {
          if (elem == "fulfilled") {
              resolve(
              setTimeout((elem) => {
                iziToast.success({
                  title: '✅',
                  message: `Fulfilled promise in ${taim}ms`,
                });
            }, taim))
        } else {
              reject(
              setTimeout((elem) => {
                iziToast.error({
                  title: '❌',
                  message: `Rejected promise in ${taim}ms`,
                });
            }, taim));
          
        }
      });
    
    
    
    });
});





