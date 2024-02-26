/* eslint-disable prettier/prettier */

const inputInformation = document.querySelector("#phoneInformation");
const errorMsgInformation = document.querySelector("#errormsginformation");
const validMsgInformation = document.querySelector("#validmsginformation");

// Inicializar intl-tel-input
const iti1 = window.intlTelInput(inputInformation, {
  initialCountry: "us",
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

const resetInformation = () => {
  inputInformation.classList.remove("error");
  errorMsgInformation.innerHTML = "";
  errorMsgInformation.style.display = "none"; // Usar display en lugar de classList
  validMsgInformation.style.display = "none";
};

// Función showError ajustada para usar display
const showErrorInformation = (msg) => {
  inputInformation.classList.add("error");
  errorMsgInformation.innerHTML = msg;
  errorMsgInformation.style.display = "block";
};

function Progres(stepp) {
  let progress_bar = document.getElementById('progress_bar');
  let actual_stepp = document.getElementById('actual_stepp');
  let porcent = stepp * 16.6;
  progress_bar.style.width = `${porcent}%`;
  actual_stepp.innerHTML = '';
  actual_stepp.innerHTML = stepp;
}

var stepsData = {};

function getData() {
  // Recorrer todos los inputs visibles, incluidos textarea y select
  $('#kt_sign_up_form :input:visible').each(function () {
    var type = $(this).attr('type');
    var name = $(this).attr('name');
    var value = $(this).val();

    // Manejar checkboxes
    if (type === 'checkbox') {
      stepsData[name] = $(this).is(':checked');
    }
    // Manejar radio buttons
    else if (type === 'radio') {
      if ($(this).is(':checked')) {
        stepsData[name] = value;
      }
    }
    // Manejar todos los otros tipos de inputs (incluidos text, textarea, select)
    else {
      stepsData[name] = value;
    }
  });

  return stepsData;
}

const form = document.getElementById('kt_sign_up_form');

// Stepper lement
var element = document.querySelector('#kt_stepper_example_basic');

// Initialize Stepper
var stepper = new KTStepper(element);

// Init validartion 1
let validaterStep1 = FormValidation.formValidation(form, {
  fields: {
    corporateName: {
      validators: {
        regexp: {
          regexp: /^[a-zA-Z.ñÑ ]+$/,
          message: 'El contenido no es válido',
        },
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    tradeNameOfDBA: {
      validators: {
        regexp: {
          regexp: /^[a-zA-Z.ñÑ ]+$/,
          message: 'El contenido no es válido',
        },
      },
    },
    state: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    city: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    postalCode: {
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
    address: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    emailInfomation: {
      validators: {
        regexp: {
          regexp: /^[a-zA-Z0-9.ñÑ_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'El contenido no es válido',
        },
        notEmpty: {
          message: 'Email es requerido',
        },
      },
    },
    website: {
      validators: {
        regexp: {
          regexp: /^(?:https?:\/\/)?(?:www\.)?[\w\-]+(?:\.[\w\-]+)+(?:\/[\w\-\.\/?%&=]*)?$/,
          message: 'El contenido no es válido',
        },
      },
    },
    TaxIdentificationNumber: {
      validators: {
        regexp: {
          regexp: /^[a-zA-Z0-9\sñÑ]+$/,
          message: 'El contenido no es válido',
        },
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    industry: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    natureOfBusiness: {
      validators: {
        regexp: {
          regexp: /^[a-zA-Z.ñÑ ]+$/,
          message: 'El contenido no es válido',
        },
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    DateOfIncorporation: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    typeOfBusiness: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    isTheApplicant: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    country: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    typeOfBusinessUSD: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    DateOfIncorporation: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    typeOfBusinessOthers: {
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

// Function to validate Step 1
const validateStep1 = async () => {
  return new Promise((resolve) => {
    validaterStep1.validate().then((status) => {
      resolve(status === 'Valid');
    });
  });
};

let stepp_1 = document.getElementById('stepp_1');

stepp_1.addEventListener('click', async function () {
  let isValidStep1 = await validateStep1();

  // Inicializa y realiza la validación del teléfono aquí
  resetInformation(); // Asegúrate de llamar a reset para limpiar errores previos
  let isValidPhone1 = false; // Suponemos inicialmente que el teléfono no es válido
  if (!inputInformation.value.trim()) {
    showErrorInformation("Telefono es requerido");
  } else if (iti1.isValidNumber()) { // Asegúrate de usar isValidNumber() o isValidNumberPrecise() según tu necesidad
    isValidPhone1 = true; // El teléfono es válido
  } else {
    const errorCode1 = iti1.getValidationError();
    const msg1 = errorMap[errorCode1] || "Número Invalido";
    showErrorInformation(msg1);
  }

  // on keyup / change flag: reset
  inputInformation.addEventListener('change', resetInformation);
  inputInformation.addEventListener('keyup', resetInformation);

  if (isValidStep1 && isValidPhone1) {
    stepsData.fullName = document.getElementById('nombre_apellidos').value;
    stepsData.email = document.getElementById('correo_electronico').value;
    stepsData.corporate = document.getElementById('empresa').value;
    stepsData.phone = document.getElementById('telefono').value;
    stepsData.country = document.getElementById('paises').value;
    getData();
    stepper.goNext();
    Progres(2);
  }
});
