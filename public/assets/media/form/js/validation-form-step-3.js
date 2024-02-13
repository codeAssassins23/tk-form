/* eslint-disable prettier/prettier */
let maxFileActaConstitutiva = 0;
let maxFileCedulaFiscal = 0;
let maxFileActaPoderes = 0;
let maxFileIdentificacionTodosSocios = 0;
let maxFileComprobanteDomicilio = 0;

// Init validartion 1
let validatorStep3 = FormValidation.formValidation(form, {
  fields: {
    actaConstitutiva: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    cedulaFiscal: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    actaPoderes: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    identificacionTodosSocios: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    comprobanteDomicilio: {
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
const validateStep3 = async () => {
  return new Promise((resolve) => {
    validatorStep3.validate().then((status) => {
      // Verificar si hay archivos subidos en el Dropzone
      var actaConstitutiva = document.getElementById('actaConstitutiva').value;
      var cedulaFiscal = document.getElementById('cedulaFiscal').value;
      var actaPoderes = document.getElementById('actaPoderes').value;
      var identificacionTodosSocios = document.getElementById(
        'identificacionTodosSocios',
      ).value;
      var comprobanteDomicilio = document.getElementById(
        'comprobanteDomicilio',
      ).value;
      // Marcar el campo oculto según si hay archivos subidos o no
      if (actaConstitutiva !== '') {
        document.getElementById('actaConstitutiva').value = 'true';
      } else {
        document.getElementById('actaConstitutiva').value = ''; // Vaciar el campo si no hay archivos subidos
      }
      if (cedulaFiscal !== '') {
        document.getElementById('cedulaFiscal').value = 'true';
      } else {
        document.getElementById('cedulaFiscal').value = ''; // Vaciar el campo si no hay archivos subidos
      }
      if (actaPoderes !== '') {
        document.getElementById('actaPoderes').value = 'true';
      } else {
        document.getElementById('actaPoderes').value = ''; // Vaciar el campo si no hay archivos subidos
      }
      if (identificacionTodosSocios !== '') {
        document.getElementById('identificacionTodosSocios').value = 'true';
      } else {
        document.getElementById('identificacionTodosSocios').value = ''; // Vaciar el campo si no hay archivos subidos
      }
      if (comprobanteDomicilio !== '') {
        document.getElementById('comprobanteDomicilio').value = 'true';
      } else {
        document.getElementById('comprobanteDomicilio').value = ''; // Vaciar el campo si no hay archivos subidos
      }
      // Resolver con el estado de validación del formulario
      resolve(
        status === 'Valid' &&
          actaConstitutiva === 'true' &&
          cedulaFiscal === 'true' &&
          actaPoderes === 'true' &&
          identificacionTodosSocios === 'true' &&
          comprobanteDomicilio === 'true',
      );
    });
  });
};

//step 3
let stepp_3_prev = document.getElementById('stepp_3_prev');

stepp_3_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
  Progres(2);
});

let stepp_3 = document.getElementById('stepp_3');

stepp_3.addEventListener('click', async function () {
  let isValidStep3 = await validateStep3();
  
  if (isValidStep3) {
    getData();
    console.log(stepsData);
    stepper.goNext();
    Progres(4);
  }
});
