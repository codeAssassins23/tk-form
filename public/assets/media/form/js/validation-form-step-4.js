/* eslint-disable prettier/prettier */
let stepp_4_prev = document.getElementById('stepp_4_prev');

stepp_4_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_4 = document.getElementById('stepp_4');

stepp_4.addEventListener('click', function () {
  stepper.goNext(); // go next step
});
