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
    nameOwner: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    occupation: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    ownership: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    dateOfBirth: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    addressOwner: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    emailOwner: {
      validators: {
        regexp: {
          regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'El contenido no es válido',
        },
        notEmpty: {
          message: 'Email es requerido',
        },
      },
    },
    nameOwner2: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    occupation2: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    ownership2: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    dateOfBirth2: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    addressOwner2: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    emailOwner2: {
      validators: {
        regexp: {
          regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'El contenido no es válido',
        },
        notEmpty: {
          message: 'Email es requerido',
        },
      },
    },
    nameOwner3: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    occupation3: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    ownership3: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    dateOfBirth3: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    addressOwner3: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    emailOwner3: {
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
    nameOwner4: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    occupation4: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    ownership4: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    dateOfBirth4: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    addressOwner4: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    emailOwner4: {
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

// Obtener referencia al bloque inferior
var bloqueInferior1 = document.getElementById('bloque1');
var bloqueInferior2 = document.getElementById('bloque2');
var bloqueInferior3 = document.getElementById('bloque3');
var bloqueInferior4 = document.getElementById('bloque4');
var optionNinguno = document.getElementById('optionNinguno');
var textNinguno = document.getElementById('textNinguno');

// Obtener referencia a los botones de radio
var radioButtons = document.querySelectorAll('input[name="sociosAcciones"]');
// Iterar sobre los botones de radio y agregar un event listener a cada uno
radioButtons.forEach(function (radioButton) {
  radioButton.addEventListener('change', function () {
    // Si el botón "Ninguno" está seleccionado, ocultar el bloque inferior
    if (this.value === '1') {
      optionNinguno.style.display = 'none';
      textNinguno.style.display = 'block';
      bloqueInferior1.style.display = 'block';
      bloqueInferior2.style.display = 'none';
      bloqueInferior3.style.display = 'none';
      bloqueInferior4.style.display = 'none';

      validatorStep5.enableValidator('nameOwner');
      validatorStep5.enableValidator('occupation');
      validatorStep5.enableValidator('ownership');
      validatorStep5.enableValidator('dateOfBirth');
      validatorStep5.enableValidator('addressOwner');
      validatorStep5.enableValidator('emailOwner');

      validatorStep5.disableValidator('nameOwner2');
      validatorStep5.disableValidator('occupation2');
      validatorStep5.disableValidator('ownership2');
      validatorStep5.disableValidator('dateOfBirth2');
      validatorStep5.disableValidator('addressOwner2');
      validatorStep5.disableValidator('emailOwner2');

      validatorStep5.disableValidator('nameOwner3');
      validatorStep5.disableValidator('occupation3');
      validatorStep5.disableValidator('ownership3');
      validatorStep5.disableValidator('dateOfBirth3');
      validatorStep5.disableValidator('addressOwner3');
      validatorStep5.disableValidator('emailOwner3');

      validatorStep5.disableValidator('nameOwner4');
      validatorStep5.disableValidator('occupation4');
      validatorStep5.disableValidator('ownership4');
      validatorStep5.disableValidator('dateOfBirth4');
      validatorStep5.disableValidator('addressOwner4');
      validatorStep5.disableValidator('emailOwner4');
    } else if (this.value === '2') {
      optionNinguno.style.display = 'none';
      textNinguno.style.display = 'block';
      bloqueInferior1.style.display = 'block';
      bloqueInferior2.style.display = 'block';
      bloqueInferior3.style.display = 'none';
      bloqueInferior4.style.display = 'none';

      validatorStep5.enableValidator('nameOwner');
      validatorStep5.enableValidator('occupation');
      validatorStep5.enableValidator('ownership');
      validatorStep5.enableValidator('dateOfBirth');
      validatorStep5.enableValidator('addressOwner');
      validatorStep5.enableValidator('emailOwner');

      validatorStep5.enableValidator('nameOwner2');
      validatorStep5.enableValidator('occupation2');
      validatorStep5.enableValidator('ownership2');
      validatorStep5.enableValidator('dateOfBirth2');
      validatorStep5.enableValidator('addressOwner2');
      validatorStep5.enableValidator('emailOwner2');

      validatorStep5.disableValidator('nameOwner3');
      validatorStep5.disableValidator('occupation3');
      validatorStep5.disableValidator('ownership3');
      validatorStep5.disableValidator('dateOfBirth3');
      validatorStep5.disableValidator('addressOwner3');
      validatorStep5.disableValidator('emailOwner3');

      validatorStep5.disableValidator('nameOwner4');
      validatorStep5.disableValidator('occupation4');
      validatorStep5.disableValidator('ownership4');
      validatorStep5.disableValidator('dateOfBirth4');
      validatorStep5.disableValidator('addressOwner4');
      validatorStep5.disableValidator('emailOwner4');
    } else if (this.value === '3') {
      optionNinguno.style.display = 'none';
      textNinguno.style.display = 'block';
      bloqueInferior1.style.display = 'block';
      bloqueInferior2.style.display = 'block';
      bloqueInferior3.style.display = 'block';
      bloqueInferior4.style.display = 'none';

      validatorStep5.enableValidator('nameOwner');
      validatorStep5.enableValidator('occupation');
      validatorStep5.enableValidator('ownership');
      validatorStep5.enableValidator('dateOfBirth');
      validatorStep5.enableValidator('addressOwner');
      validatorStep5.enableValidator('emailOwner');

      validatorStep5.enableValidator('nameOwner2');
      validatorStep5.enableValidator('occupation2');
      validatorStep5.enableValidator('ownership2');
      validatorStep5.enableValidator('dateOfBirth2');
      validatorStep5.enableValidator('addressOwner2');
      validatorStep5.enableValidator('emailOwner2');

      validatorStep5.enableValidator('nameOwner3');
      validatorStep5.enableValidator('occupation3');
      validatorStep5.enableValidator('ownership3');
      validatorStep5.enableValidator('dateOfBirth3');
      validatorStep5.enableValidator('addressOwner3');
      validatorStep5.enableValidator('emailOwner3');

      validatorStep5.disableValidator('nameOwner4');
      validatorStep5.disableValidator('occupation4');
      validatorStep5.disableValidator('ownership4');
      validatorStep5.disableValidator('dateOfBirth4');
      validatorStep5.disableValidator('addressOwner4');
      validatorStep5.disableValidator('emailOwner4');
    } else if (this.value === '4') {
      optionNinguno.style.display = 'none';
      textNinguno.style.display = 'block';
      bloqueInferior1.style.display = 'block';
      bloqueInferior2.style.display = 'block';
      bloqueInferior3.style.display = 'block';
      bloqueInferior4.style.display = 'block';

      validatorStep5.enableValidator('nameOwner');
      validatorStep5.enableValidator('occupation');
      validatorStep5.enableValidator('ownership');
      validatorStep5.enableValidator('dateOfBirth');
      validatorStep5.enableValidator('addressOwner');
      validatorStep5.enableValidator('emailOwner');

      validatorStep5.enableValidator('nameOwner2');
      validatorStep5.enableValidator('occupation2');
      validatorStep5.enableValidator('ownership2');
      validatorStep5.enableValidator('dateOfBirth2');
      validatorStep5.enableValidator('addressOwner2');
      validatorStep5.enableValidator('emailOwner2');

      validatorStep5.enableValidator('nameOwner3');
      validatorStep5.enableValidator('occupation3');
      validatorStep5.enableValidator('ownership3');
      validatorStep5.enableValidator('dateOfBirth3');
      validatorStep5.enableValidator('addressOwner3');
      validatorStep5.enableValidator('emailOwner3');

      validatorStep5.enableValidator('nameOwner4');
      validatorStep5.enableValidator('occupation4');
      validatorStep5.enableValidator('ownership4');
      validatorStep5.enableValidator('dateOfBirth4');
      validatorStep5.enableValidator('addressOwner4');
      validatorStep5.enableValidator('emailOwner4');
    } else if (this.value === '5') {
      optionNinguno.style.display = 'block';
      textNinguno.style.display = 'none';
      bloqueInferior1.style.display = 'block';
      bloqueInferior2.style.display = 'none';
      bloqueInferior3.style.display = 'none';
      bloqueInferior4.style.display = 'none';

      validatorStep5.enableValidator('nameOwner');
      validatorStep5.enableValidator('occupation');
      validatorStep5.enableValidator('ownership');
      validatorStep5.enableValidator('dateOfBirth');
      validatorStep5.enableValidator('addressOwner');
      validatorStep5.enableValidator('emailOwner');

      validatorStep5.disableValidator('nameOwner2');
      validatorStep5.disableValidator('occupation2');
      validatorStep5.disableValidator('ownership2');
      validatorStep5.disableValidator('dateOfBirth2');
      validatorStep5.disableValidator('addressOwner2');
      validatorStep5.disableValidator('emailOwner2');

      validatorStep5.disableValidator('nameOwner3');
      validatorStep5.disableValidator('occupation3');
      validatorStep5.disableValidator('ownership3');
      validatorStep5.disableValidator('dateOfBirth3');
      validatorStep5.disableValidator('addressOwner3');
      validatorStep5.disableValidator('emailOwner3');

      validatorStep5.disableValidator('nameOwner4');
      validatorStep5.disableValidator('occupation4');
      validatorStep5.disableValidator('ownership4');
      validatorStep5.disableValidator('dateOfBirth4');
      validatorStep5.disableValidator('addressOwner4');
      validatorStep5.disableValidator('emailOwner4');
    }
  });
});

let stepp_5_prev = document.getElementById('stepp_5_prev');

stepp_5_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
  Progres(4);
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
    Progres(6);
  }
});
