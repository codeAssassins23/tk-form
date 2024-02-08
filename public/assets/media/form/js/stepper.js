/* eslint-disable prettier/prettier */
// Stepper lement
var element = document.querySelector('#kt_stepper_example_basic');

// Initialize Stepper
var stepper = new KTStepper(element);

// Handle next step

let stepp_1 = document.getElementById('stepp_1');

stepp_1.addEventListener('click', function () {
  console.log('Siguiente paso');
  stepper.goNext(); // go next step
});

let stepp_2_prev = document.getElementById('stepp_2_prev');

stepp_2_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_2 = document.getElementById('stepp_2');

stepp_2.addEventListener('click', function () {
  stepper.goNext(); // go next step
});

let stepp_3_prev = document.getElementById('stepp_3_prev');

stepp_3_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_3 = document.getElementById('stepp_3');

stepp_3.addEventListener('click', function () {
  stepper.goNext(); // go next step
});

let stepp_4_prev = document.getElementById('stepp_4_prev');

stepp_4_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_4 = document.getElementById('stepp_4');

stepp_4.addEventListener('click', function () {
  stepper.goNext(); // go next step
});

let stepp_5_prev = document.getElementById('stepp_5_prev');

stepp_5_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_5 = document.getElementById('stepp_5');

stepp_5.addEventListener('click', function () {
  stepper.goNext(); // go next step
});

let stepp_6_prev = document.getElementById('stepp_6_prev');

stepp_6_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_6 = document.getElementById('stepp_6');

stepp_6.addEventListener('click', function () {
  stepper.goNext(); // go next step
});

// Handle previous step

stepper.goPrevious(); // go previous step

// let progressbar = document.getElementById('progressbar');
