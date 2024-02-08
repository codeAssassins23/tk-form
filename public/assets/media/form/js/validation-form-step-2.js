/* eslint-disable prettier/prettier */
// Stepper lement

//step 2
let stepp_2_prev = document.getElementById('stepp_2_prev');

stepp_2_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_2 = document.getElementById('stepp_2');
console.log(stepp_2);
stepp_2.addEventListener('click', async function () {
  let isValidStep2 = await validateStep2();
  console.log(isValidStep2);
  if (isValidStep2) {
    stepper.goNext();
  }
});
