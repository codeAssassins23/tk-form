/* eslint-disable prettier/prettier */
var maxFileDigitalSignature = 0;

// Init validartion 1
let validatorStep6 = FormValidation.formValidation(form, {
  fields: {
    nameAuthorizationMonex: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    titlePositionAuthorizationMonex: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    dateAuthorizationMonex: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    digitalSignature: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    acceptTerms: {
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
const validateStep6 = async () => {
  return new Promise((resolve) => {
    validatorStep6.validate().then((status) => {
      // Verificar si hay archivos subidos en el Dropzone
      var digitalSignature = document.getElementById('digitalSignature').value;
      // Marcar el campo oculto según si hay archivos subidos o no
      if (digitalSignature !== '') {
        document.getElementById('digitalSignature').value = 'true';
      } else {
        document.getElementById('digitalSignature').value = ''; // Vaciar el campo si no hay archivos subidos
      }
      // Resolver con el estado de validación del formulario
      resolve(status === 'Valid' && digitalSignature === 'true');
    });
  });
};

let stepp_6_prev = document.getElementById('stepp_6_prev');

stepp_6_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
  Progres(5);
});

let stepp_6 = document.getElementById('stepp_6');

stepp_6.addEventListener('click', function () {
  let isValidStep6 = validateStep6();
  isValidStep6.then((value) => {
    if (value) {
      getData();
      console.log(stepsData);
    }
  });
});
