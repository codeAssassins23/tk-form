/* eslint-disable prettier/prettier */

let stepp_6_prev = document.getElementById('stepp_6_prev');

stepp_6_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_6 = document.getElementById('stepp_6');

stepp_6.addEventListener('click', function () {
  stepper.goNext(); // go next step
});
