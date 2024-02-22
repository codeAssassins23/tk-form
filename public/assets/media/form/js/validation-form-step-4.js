/* eslint-disable prettier/prettier */
//1
const inputAutorizacion = document.querySelector("#telefonoCelular");
const errorAutorizacion = document.querySelector("#error-msg-autoriza");
const validAutorizacion = document.querySelector("#valid-msg-autoriza");

// Inicializar intl-tel-input
const iti2 = window.intlTelInput(inputAutorizacion, {
  initialCountry: "us",
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

const resetAutorizacion = () => {
  inputAutorizacion.classList.remove("error");
  errorAutorizacion.innerHTML = "";
  errorAutorizacion.style.display = "none"; // Usar display en lugar de classList
  validAutorizacion.style.display = "none";
};

// Función showError ajustada para usar display
const showErrorAutorizacion = (msg) => {
  inputAutorizacion.classList.add("error");
  errorAutorizacion.innerHTML = msg;
  errorAutorizacion.style.display = "block";
};

//2

const inputAutorizacion2 = document.querySelector("#telefonoCelular2");
const errorAutorizacion2 = document.querySelector("#error-msg-autoriza2");
const validAutorizacion2 = document.querySelector("#valid-msg-autoriza2");

// Inicializar intl-tel-input
const iti3 = window.intlTelInput(inputAutorizacion2, {
  initialCountry: "us",
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

const resetAutorizacion2 = () => {
  inputAutorizacion2.classList.remove("error");
  errorAutorizacion2.innerHTML = "";
  errorAutorizacion2.style.display = "none"; // Usar display en lugar de classList
  validAutorizacion2.style.display = "none";
};

// Función showError ajustada para usar display
const showErrorAutorizacion2 = (msg) => {
  inputAutorizacion2.classList.add("error");
  errorAutorizacion2.innerHTML = msg;
  errorAutorizacion2.style.display = "block";
};

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

function validatePhone(inputElement, itiInstance, showErrorFunction, resetAutorizacion3) {
  resetAutorizacion3(); // Asume una función genérica de reset
  if (!inputElement.value.trim()) {
    showErrorFunction("Telefono es requerido");
    return false;
  } else if (itiInstance.isValidNumber()) {
    return true; // El teléfono es válido
  } else {
    const errorCode2 = itiInstance.getValidationError();
    const msg2 = errorMap[errorCode2] || "Número Inválido";
    showErrorFunction(msg2);
    return false;
  }
}

addButton.addEventListener('click', function () {
  usuarioAutorizado2.classList.toggle('d-none');
  validatorStep4.enableValidator('nombreApellido2');
  validatorStep4.enableValidator('cargoEmpresa2');
  validatorStep4.enableValidator('correoElectronico2');
  addButton.style.display = 'none';
  removeButton.style.display = 'block';
  // Reinicia y valida el segundo número de teléfono al añadir
  resetAutorizacion2();
  validatePhone(inputAutorizacion2, iti2, showErrorAutorizacion2);
});

removeButton.addEventListener('click', function () {
  usuarioAutorizado2.classList.toggle('d-none');
  validatorStep4.disableValidator('nombreApellido2');
  validatorStep4.disableValidator('cargoEmpresa2');
  validatorStep4.disableValidator('correoElectronico2');
  addButton.style.display = 'block';
  removeButton.style.display = 'none';
  // Solo reinicia el estado del segundo número de teléfono al remover
  resetAutorizacion2();
});

let stepp_4_prev = document.getElementById('stepp_4_prev');

stepp_4_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
  Progres(3);
});

let stepp_4 = document.getElementById('stepp_4');
stepp_4.addEventListener('click', async function () {
  let isValidStep4 = await validateStep4();
  // on keyup / change flag: reset
  inputAutorizacion.addEventListener('change', resetAutorizacion);
  inputAutorizacion.addEventListener('keyup', resetAutorizacion);

  inputAutorizacion2.addEventListener('change', resetAutorizacion2);
  inputAutorizacion2.addEventListener('keyup', resetAutorizacion2);

  let isValidPhone2 = validatePhone(inputAutorizacion, iti2, showErrorAutorizacion, resetAutorizacion); // Validar primer teléfono
  let isValidPhone3 = usuarioAutorizado2.classList.contains('d-none') ? true : validatePhone(inputAutorizacion2, iti3, showErrorAutorizacion2, resetAutorizacion2); // Validar segundo teléfono si es visible
  console.log(isValidPhone3, "isValidPhone3");
  if (isValidStep4 && isValidPhone2 && isValidPhone3) {
    getData();
    stepper.goNext();
    Progres(5);
  }
});
