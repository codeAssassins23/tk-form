/* eslint-disable prettier/prettier */

let stepp_5_prev = document.getElementById('stepp_5_prev');

stepp_5_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_5 = document.getElementById('stepp_5');

stepp_5.addEventListener('click', function () {
  stepper.goNext(); // go next step
});
