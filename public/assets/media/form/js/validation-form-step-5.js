/* eslint-disable prettier/prettier */

// Init validartion 1
let validatorStep5 = FormValidation.formValidation(form, {
  fields: {
    sociosAcciones: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
  },
  plugins: {
    trigger: new FormValidation.plugins.Trigger(),
    bootstrap: new FormValidation.plugins.Bootstrap5({
      rowSelector: '.fv-row',
      eleInvalidClass: '',
      eleValidClass: '',
    }),
  },
});

// Function to validate Step 5
const validateStep5 = async () => {
  return new Promise((resolve) => {
    validatorStep5.validate().then((status) => {
      resolve(status === 'Valid');
    });
  });
};

let stepp_5_prev = document.getElementById('stepp_5_prev');

stepp_5_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_5 = document.getElementById('stepp_5');
console.log(stepp_5);
stepp_5.addEventListener('click', async function () {
  let isValidStep5 = await validateStep5();
  console.log(isValidStep5);
  if (isValidStep5) {
    getData();
    console.log(stepsData);
    stepper.goNext();
  }
});
