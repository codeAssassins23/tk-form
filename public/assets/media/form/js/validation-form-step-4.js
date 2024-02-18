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
        regexp: {
          regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'El contenido no es válido',
        },
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    nombreApellido2: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    cargoEmpresa2: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    telefonoCelular2: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    correoElectronico2: {
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
validatorStep4.disableValidator('nombreApellido2');
validatorStep4.disableValidator('cargoEmpresa2');
validatorStep4.disableValidator('telefonoCelular2');
validatorStep4.disableValidator('correoElectronico2');
// Function to validate Step 4
const validateStep4 = async () => {
  return new Promise((resolve) => {
    validatorStep4.validate().then((status) => {
      resolve(status === 'Valid');
    });
  });
};

let usuarioAutorizado2 = document.getElementById('usuarioAutorizado2');

let removeButton = document.getElementById('removeButton');
let addButton = document.getElementById('addButton');

addButton.addEventListener('click', function () {
  usuarioAutorizado2.classList.toggle('d-none');
  validatorStep4.enableValidator('nombreApellido2');
  validatorStep4.enableValidator('cargoEmpresa2');
  validatorStep4.enableValidator('telefonoCelular2');
  validatorStep4.enableValidator('correoElectronico2');
  addButton.style.display = 'none';
  removeButton.style.display = 'block';
});

removeButton.addEventListener('click', function () {
  usuarioAutorizado2.classList.toggle('d-none');
  validatorStep4.disableValidator('nombreApellido2');
  validatorStep4.disableValidator('cargoEmpresa2');
  validatorStep4.disableValidator('telefonoCelular2');
  validatorStep4.disableValidator('correoElectronico2');
  addButton.style.display = 'block';
  removeButton.style.display = 'none';
});

let stepp_4_prev = document.getElementById('stepp_4_prev');

stepp_4_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
  Progres(3);
});

let stepp_4 = document.getElementById('stepp_4');
console.log(stepp_4);
stepp_4.addEventListener('click', async function () {
  
  let isValidStep4 = await validateStep4();
  console.log(isValidStep4);
  if (isValidStep4) {
    getData();
    console.log(stepsData);
    stepper.goNext();
    Progres(5);
  }
});