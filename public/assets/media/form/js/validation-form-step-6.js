/* eslint-disable prettier/prettier */
var maxFileDigitalSignature = 0;

var dropzoneDigitalSignature = new Dropzone('#dropzoneDigitalSignature', {
  url: 'http://localhost:3200/admin/getHoldingAccounts', // Set the url for your upload script location
  paramName: 'file', // The name that will be used to transfer the file
  maxFileDigitalSignature: 4,
  maxFilesize: 7, // MB
  addRemoveLinks: true,
  accept: function (file, done) {
    if (file.name == 'wow.jpg') {
      done("Naha, you don't.");
    } else {
      done();
    }
  },
});

// Init validartion 1
let validatorStep6 = FormValidation.formValidation(form, {
  fields: {
    fullNameAutorization: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    titlePositionAutorization: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    dateAutorization: {
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

// Agregar validación de campos Dropzone 1
dropzoneDigitalSignature.on('addedfile', function () {
  maxFileDigitalSignature = maxFileDigitalSignature + 1;
  document.getElementById('digitalSignature').value = 'true';
});

// Evento cuando se elimina un archivo del Dropzone
dropzoneDigitalSignature.on('removedfile', function () {
  maxFileDigitalSignature = maxFileDigitalSignature - 1;
  if (maxFileDigitalSignature > 0) {
    document.getElementById('digitalSignature').value = 'true';
  } else {
    document.getElementById('digitalSignature').value = ''; // Vaciar el campo si no hay archivos subidos
  }
});

let stepp_6_prev = document.getElementById('stepp_6_prev');

stepp_6_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_6 = document.getElementById('stepp_6');

stepp_6.addEventListener('click', function () {
  let isValidStep6 = validateStep6();
  isValidStep6.then((value) => {
    if (value) {
      console.log('siguió al siguiente paso, osea enviar el formulario');
      stepper.goNext(); // go next step
    }
  });
});
