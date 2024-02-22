/* eslint-disable prettier/prettier */

// Inicializar intl-tel-input
const input1Stepp4 = document.querySelector('#telefonoCelular');
const errorMsg1Stepp4 = document.querySelector('#error-msg-stepp4-1');
const validMsg1Stepp4 = document.querySelector('#valid-msg-stepp4-1');

const input2Stepp4 = document.querySelector('#telefonoCelular1');
const errorMsg2Stepp4 = document.querySelector('#error-msg-stepp4-2');
const validMsg2Stepp4 = document.querySelector('#valid-msg-stepp4-2');

// Mapa de errores
const errorMap = [
  'Numero invalido',
  'Código de pais invalido',
  'Demasiado corto',
  'Demasiado largo',
  'Numero invalido',
];

// Inicializar intl-tel-input
const iti1Stepp4 = window.intlTelInput(input1Stepp4, {
  initialCountry: 'us',
  utilsScript:
    'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
});

const reset = () => {
  input1Stepp4.classList.remove('error');
  errorMsg1Stepp41Stepp4.innerHTML = '';
  errorMsg1Stepp4.style.display = 'none'; // Usar display en lugar de classList
  validMsg1Stepp4.style.display = 'none'; // Usar display en lugar de classList
  input2Stepp4.classList.remove('error');
  errorMsg2Stepp4.innerHTML = '';
  errorMsg2Stepp4.style.display = 'none'; // Usar display en lugar de classList
  validMsg2Stepp4.style.display = 'none'; // Usar display en lugar de classList
};

// Función showError ajustada para usar display
const showError = (msg) => {
  input1Stepp4.classList.add('error');
  errorMsg1Stepp4.innerHTML = msg;
  errorMsg1Stepp4.style.display = 'block'; // Remover display:none para mostrar el mensaje
  input2Stepp4.classList.add('error');
  errorMsg2Stepp4.innerHTML = msg;
  errorMsg2Stepp4.style.display = 'block'; // Remover display:none para mostrar el mensaje
};

// Inicializar intl-tel-input
const iti2Stepp4 = window.intlTelInput(input2Stepp4, {
  initialCountry: 'us',
  utilsScript:
    'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
});

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
      regexp: {
        regexp: /^[0-9]+$/,
        message: 'El contenido no es válido',
      },
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    correoElectronico: {
      validators: {
        regexp: {
          regexp: /^[a-zA-Z0-9.ñÑ_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
        regexp: {
          regexp: /^[0-9]+$/,
          message: 'El contenido no es válido',
        },
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    correoElectronico2: {
      validators: {
        regexp: {
          regexp: /^[a-zA-Z0-9.ñÑ_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'El contenido no es válido',
        },
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
stepp_4.addEventListener('click', async function () {
  let isValidStep4 = await validateStep4();
  if (isValidStep4) {
    getData();
    stepper.goNext();
    Progres(5);
  }

  // Inicializa y realiza la validación del teléfono aquí
  reset(); // Asegúrate de llamar a reset para limpiar errores previos
  let isValidPhone = false; // Suponemos inicialmente que el teléfono no es válido
  if (!input1Stepp4.value.trim()) {
    showError('Telefono es requerido');
  } else if (iti1Stepp4.isValidNumber()) {
    // Asegúrate de usar isValidNumber() o isValidNumberPrecise() según tu necesidad
    isValidPhone = true; // El teléfono es válido
  } else {
    const errorCode = iti1Stepp4.getValidationError();
    const msg = errorMap[errorCode] || 'Número Invalido';
    showError(msg);
  }

  if (!input2Stepp4.value.trim()) {
    showError('Telefono es requerido');
  } else if (iti2Stepp4.isValidNumber()) {
    // Asegúrate de usar isValidNumber() o isValidNumberPrecise() según tu necesidad
    isValidPhone = true; // El teléfono es válido
  } else {
    const errorCode = iti2Stepp4.getValidationError();
    const msg = errorMap[errorCode] || 'Número Invalido';
    showError(msg);
  }

  // on keyup / change flag: reset
  input1Stepp4.addEventListener('change', reset);
  input1Stepp4.addEventListener('keyup', reset);

  input2Stepp4.addEventListener('change', reset);
  input2Stepp4.addEventListener('keyup', reset);

  if (isValid1 && isValidPhone) {
    //Crear función para enviar correo
    const loadingEl = document.createElement('div');
    document.body.prepend(loadingEl);
    loadingEl.classList.add('page-loader');
    loadingEl.classList.add('flex-column');
    loadingEl.classList.add('bg-dark');
    loadingEl.classList.add('bg-opacity-25');
    loadingEl.innerHTML = `
        <span class="spinner-border text-primary" role="status"></span>
        <span class="text-gray-800 fs-6 fw-semibold mt-5">Loading...</span>
    `;
  }
});
