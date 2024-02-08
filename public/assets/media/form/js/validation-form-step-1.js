/* eslint-disable prettier/prettier */
// Stepper lement
var element = document.querySelector('#kt_stepper_example_basic');

// Initialize Stepper
var stepper = new KTStepper(element);

//step1
let stepp_1 = document.getElementById('stepp_1');

stepp_1.addEventListener('click', function () {
  console.log('Siguiente paso');
  stepper.goNext(); // go next step
});
