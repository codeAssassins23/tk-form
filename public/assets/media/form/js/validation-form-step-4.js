/* eslint-disable prettier/prettier */

// Init validartion 1
let validatorStep4 = FormValidation.formValidation(form, {
  fields: {
    nombreApellido: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    cargoEmpresa: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    telefonoCelular: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    correoElectronico: {
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

// Function to validate Step 4
const validateStep4 = async () => {
  return new Promise((resolve) => {
    validatorStep4.validate().then((status) => {
      resolve(status === 'Valid');
    });
  });
};

let stepp_4_prev = document.getElementById('stepp_4_prev');

stepp_4_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_4 = document.getElementById('stepp_4');
console.log(stepp_4);
stepp_4.addEventListener('click', async function () {
  let isValidStep4 = await validateStep4();
  console.log(isValidStep4);
  if (isValidStep4) {
    stepper.goNext();
  }
});
