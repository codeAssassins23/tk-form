/* eslint-disable prettier/prettier */
let maxFileActaConstitutiva = 0;
let maxFileCedulaFiscal = 0;
let maxFileActaPoderes = 0;
let maxFileIdentificacionTodosSocios = 0;
let maxFileComprobanteDomicilio = 0;

var dropzoneActaConstitutiva = new Dropzone('#dropzoneActaConstitutiva', {
  url: 'http://localhost:3200/admin/getHoldingAccounts', // Set the url for your upload script location
  paramName: 'file', // The name that will be used to transfer the file
  maxFileActaConstitutiva: 4,
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

var dropzoneCedulaFiscal = new Dropzone('#dropzoneCedulaFiscal', {
  url: 'http://localhost:3200/admin/getHoldingAccounts', // Set the url for your upload script location
  paramName: 'file', // The name that will be used to transfer the file
  maxFileCedulaFiscal: 4,
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

var dropzoneActaPoderes = new Dropzone('#dropzoneActaPoderes', {
  url: 'http://localhost:3200/admin/getHoldingAccounts', // Set the url for your upload script location
  paramName: 'file', // The name that will be used to transfer the file
  maxFileActaPoderes: 4,
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

var dropezoneIdentifiTodosSocios = new Dropzone('#dropzoneIdentifiTodosSocios', {
  url: 'http://localhost:3200/admin/getHoldingAccounts', // Set the url for your upload script location
  paramName: 'file', // The name that will be used to transfer the file
  maxFileIdentificacionTodosSocios: 4,
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

var dropzoneComprobanteDomicilio = new Dropzone('#dropzoneComprobanteDomicilio', {
  url: 'http://localhost:3200/admin/getHoldingAccounts', // Set the url for your upload script location
  paramName: 'file', // The name that will be used to transfer the file
  maxFileComprobanteDomicilio: 4,
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
    actaPoderes:{
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    identificacionTodosSocios:{
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    comprobanteDomicilio:{
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
      var identificacionTodosSocios = document.getElementById('identificacionTodosSocios').value;
      var comprobanteDomicilio = document.getElementById('comprobanteDomicilio').value;
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
      resolve(status === 'Valid' && actaConstitutiva === 'true' && cedulaFiscal === 'true' && actaPoderes === 'true' && identificacionTodosSocios === 'true' && comprobanteDomicilio === 'true');
    });
  });
};

// Agregar validación de campos Dropzone 1
dropzoneActaConstitutiva.on('addedfile', function () {
  maxFileActaConstitutiva = maxFileActaConstitutiva + 1;
  document.getElementById('actaConstitutiva').value = 'true';
});

// Evento cuando se elimina un archivo del Dropzone
dropzoneActaConstitutiva.on('removedfile', function () {
  maxFileActaConstitutiva = maxFileActaConstitutiva - 1;
  if (maxFileActaConstitutiva > 0) {
    document.getElementById('actaConstitutiva').value = 'true';
  } else {
    document.getElementById('actaConstitutiva').value = ''; // Vaciar el campo si no hay archivos subidos
  }
});

// Agregar validación de campos Dropzone 2
dropzoneCedulaFiscal.on('addedfile', function () {
  maxFileCedulaFiscal = maxFileCedulaFiscal + 1;
  document.getElementById('cedulaFiscal').value = 'true';
});

// Evento cuando se elimina un archivo del Dropzone
dropzoneCedulaFiscal.on('removedfile', function () {
  maxFileCedulaFiscal = maxFileCedulaFiscal - 1;
  if(maxFileCedulaFiscal > 0){
    document.getElementById('cedulaFiscal').value = 'true';
  } else {
    document.getElementById('cedulaFiscal').value = ''; // Vaciar el campo si no hay archivos subidos
  }
});

// Agregar validación de campos Dropzone 3
dropzoneActaPoderes.on('addedfile', function () {
  maxFileActaPoderes = maxFileActaPoderes + 1;
  document.getElementById('actaPoderes').value = 'true';
});

// Evento cuando se elimina un archivo del Dropzone
dropzoneActaPoderes.on('removedfile', function () {
  maxFileActaPoderes = maxFileActaPoderes - 1;
  if(maxFileActaPoderes > 0){
    document.getElementById('actaPoderes').value = 'true';
  } else {
    document.getElementById('actaPoderes').value = ''; // Vaciar el campo si no hay archivos subidos
  }
});

// Agregar validación de campos Dropzone 4
dropezoneIdentifiTodosSocios.on('addedfile', function () {
  maxFileIdentificacionTodosSocios = maxFileIdentificacionTodosSocios + 1;
  document.getElementById('identificacionTodosSocios').value = 'true';
});

// Evento cuando se elimina un archivo del Dropzone
dropezoneIdentifiTodosSocios.on('removedfile', function () {
  maxFileIdentificacionTodosSocios = maxFileIdentificacionTodosSocios - 1;
  if(maxFileIdentificacionTodosSocios > 0){
    document.getElementById('identificacionTodosSocios').value = 'true';
  } else {
    document.getElementById('identificacionTodosSocios').value = ''; // Vaciar el campo si no hay archivos subidos
  }
});

// Agregar validación de campos Dropzone 5
dropzoneComprobanteDomicilio.on('addedfile', function () {
  maxFileComprobanteDomicilio = maxFileComprobanteDomicilio + 1;
  document.getElementById('comprobanteDomicilio').value = 'true';
});

// Evento cuando se elimina un archivo del Dropzone
dropzoneComprobanteDomicilio.on('removedfile', function () {
  maxFileComprobanteDomicilio = maxFileComprobanteDomicilio - 1;
  if(maxFileComprobanteDomicilio > 0){
    document.getElementById('comprobanteDomicilio').value = 'true';
  } else {
    document.getElementById('comprobanteDomicilio').value = ''; // Vaciar el campo si no hay archivos subidos
  }
});

//step 3
let stepp_3_prev = document.getElementById('stepp_3_prev');

stepp_3_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_3 = document.getElementById('stepp_3');

stepp_3.addEventListener('click', async function () {
  let isValidStep3 = await validateStep3();
  console.log(isValidStep3);
  if (isValidStep3) {
    stepper.goNext();
  }
});
