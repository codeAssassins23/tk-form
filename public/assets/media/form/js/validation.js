/* eslint-disable prettier/prettier */
const form1 = document.getElementById('kt_sign_up_form_first');
function initializeDropzone(idLead) {
  var dropzoneActaConstitutiva = new Dropzone('#dropzoneActaConstitutiva', {
    url: `http://localhost:3200/uploadFilesOne/${idLead}`, // Set the url for your upload script location
    paramName: 'file', // The name that will be used to transfer the file
    maxFiles: 1,
    maxFilesize: 20, // MB
    maxThumbnailFilesize: 20, // MB
    addRemoveLinks: true,
    acceptedFiles: 'application/pdf',
    accept: function (file, done) {
      // Validar si el archivo es PDF
      if (file.type !== 'application/pdf') {
        done('Solo se permiten archivos PDF.');
      } else {
        // Validar si el archivo supera el tamaño máximo
        if (file.size > 20 * 1024 * 1024) {
          // Convertir MB a bytes (1 MB = 1024 * 1024 bytes)
          done('El tamaño del archivo excede el límite de 20 MB.');
        } else {
          document.getElementById('actaConstitutiva').value = 'true';
          done(); // Archivo válido
        }
      }
    },
    init: function () {
      this.on('error', function (file, message) {
        // Manejar errores de validación
        alert(message);
        this.removeFile(file); // Eliminar el archivo que no cumple con las validaciones
      });
      this.on('removedfile', function (file) {
        // Manejar el evento de eliminación de archivo
        document.getElementById('actaConstitutiva').value = '';
      });
    },
  });

  var dropzoneCedulaFiscal = new Dropzone('#dropzoneCedulaFiscal', {
    url: `http://localhost:3200/uploadFilesTwo/${idLead}`, // Set the url for your upload script location
    paramName: 'file', // The name that will be used to transfer the file
    maxFiles: 1,
    maxFilesize: 20, // MB
    maxThumbnailFilesize: 20, // MB
    addRemoveLinks: true,
    acceptedFiles: 'application/pdf',
    accept: function (file, done) {
      if (file.type !== 'application/pdf') {
        done('Solo se permite archivos PDF.');
      } else {
        if (file.size > 20 * 1024 * 1024) {
          done('El tamaño del archivo excede el límite de 20MB');
        } else {
          document.getElementById('cedulaFiscal').value = 'true';
          done();
        }
      }
    },
    init: function () {
      this.on('error', function (file, message) {
        alert(message);
        this.removeFile(file);
      });
      this.on('removedfile', function (file) {
        // Manejar el evento de eliminación de archivo
        document.getElementById('cedulaFiscal').value = '';
      });
    },
  });

  var dropzoneActaPoderes = new Dropzone('#dropzoneActaPoderes', {
    url: `http://localhost:3200/uploadFilesThree/${idLead}`, // Set the url for your upload script location
    paramName: 'file', // The name that will be used to transfer the file
    maxFiles: 1,
    maxFilesize: 20, // MB
    maxThumbnailFilesize: 20, // MB
    addRemoveLinks: true,
    acceptedFiles: 'application/pdf',
    accept: function (file, done) {
      if (file.type !== 'application/pdf') {
        done('Solo se permite archivos pdf');
      } else {
        if (file.size > 20 * 1024 * 1024) {
          done('El tamaño del archivo excede el límite de 20MB');
        } else {
          document.getElementById('actaPoderes').value = 'true';
          done();
        }
      }
    },
    init: function () {
      this.on('error', function (file, message) {
        // Manejar errores de validación
        alert(message);
        this.removeFile(file); // Eliminar el archivo que no cumple con las validaciones
      });
      this.on('removedfile', function (file) {
        // Manejar el evento de eliminación de archivo
        document.getElementById('actaPoderes').value = '';
      });
    },
  });

  var dropezoneIdentifiTodosSocios = new Dropzone(
    '#dropzoneIdentifiTodosSocios',
    {
      url: `http://localhost:3200/uploadFilesFour/${idLead}`, // Set the url for your upload script location
      paramName: 'file', // The name that will be used to transfer the file
      maxFiles: 1,
      maxFilesize: 20, // MB
      addRemoveLinks: true,
      maxThumbnailFilesize: 20, // MB
      acceptedFiles: 'application/pdf',
      accept: function (file, done) {
        if (file.type !== 'application/pdf') {
          done('Solo se permite archivos pdf');
        } else {
          if (file.size > 20 * 1024 * 1024) {
            done('El tamaño del archivo excede el límite de 20MB');
          } else {
            document.getElementById('identificacionTodosSocios').value = 'true';
            done();
          }
        }
      },
      init: function () {
        this.on('error', function (file, message) {
          // Manejar errores de validación
          alert(message);
          this.removeFile(file); // Eliminar el archivo que no cumple con las validaciones
        });
        this.on('removedfile', function (file) {
          // Manejar el evento de eliminación de archivo
          document.getElementById('identificacionTodosSocios').value = '';
        });
      },
    },
  );

  var dropzoneComprobanteDomicilio = new Dropzone(
    '#dropzoneComprobanteDomicilio',
    {
      url: `http://localhost:3200/uploadFilesFive/${idLead}`, // Set the url for your upload script location
      paramName: 'file', // The name that will be used to transfer the file
      maxFiles: 1,
      maxFilesize: 20, // MB
      addRemoveLinks: true,
      maxThumbnailFilesize: 20, // MB
      acceptedFiles: 'application/pdf',
      accept: function (file, done) {
        if (file.type !== 'application/pdf') {
          done('Solo se permite archivos pdf');
        } else {
          if (file.size > 20 * 1024 * 1024) {
            done('El tamaño del archivo excede el límite de 20MB');
          } else {
            document.getElementById('comprobanteDomicilio').value = 'true';
            done();
          }
        }
      },
      init: function () {
        this.on('error', function (file, message) {
          // Manejar errores de validación
          alert(message);
          this.removeFile(file); // Eliminar el archivo que no cumple con las validaciones
        });
        this.on('removedfile', function (file) {
          // Manejar el evento de eliminación de archivo
          document.getElementById('comprobanteDomicilio').value = '';
        });
      },
    },
  );

  var dropzoneDigitalSignature = new Dropzone('#dropzoneDigitalSignature', {
    url: `http://localhost:3200/uploadFilesSix/${idLead}`, // Set the url for your upload script location
    paramName: 'file', // The name that will be used to transfer the file
    maxFiles: 1,
    maxFilesize: 20, // MB
    addRemoveLinks: true,
    maxThumbnailFilesize: 20, // MB
    acceptedFiles: 'application/pdf',
    accept: function (file, done) {
      if (file.type !== 'application/pdf') {
        done('Solo se permite archivos pdf');
      } else {
        if (file.size > 20 * 1024 * 1024) {
          done('El tamaño del archivo excede el límite de 20MB');
        } else {
          document.getElementById('digitalSignature').value = 'true';
          done();
        }
      }
    },
    init: function () {
      this.on('error', function (file, message) {
        // Manejar errores de validación
        alert(message);
        this.removeFile(file); // Eliminar el archivo que no cumple con las validaciones
      });
      this.on('removedfile', function (file) {
        // Manejar el evento de eliminación de archivo
        document.getElementById('digitalSignature').value = '';
      });
    },
  });

  var dropZoneChequeAnulado = new Dropzone('#dropZoneChequeAnulado', {
    url: `http://localhost:3200/uploadFilethreUSD/${idLead}`, // Set the url for your upload script location
    paramName: 'file', // The name that will be used to transfer the file
    maxFiles: 1,
    maxFilesize: 20, // MB
    maxThumbnailFilesize: 20, // MB
    addRemoveLinks: true,
    acceptedFiles: 'application/pdf',
    accept: function (file, done) {
      // Validar si el archivo es PDF
      if (file.type !== 'application/pdf') {
        done('Solo se permiten archivos PDF.');
      } else {
        // Validar si el archivo supera el tamaño máximo
        if (file.size > 20 * 1024 * 1024) {
          // Convertir MB a bytes (1 MB = 1024 * 1024 bytes)
          done('El tamaño del archivo excede el límite de 20 MB.');
        } else {
          document.getElementById('chequeAnuladoInput').value = 'true';
          done(); // Archivo válido
        }
      }
    },
    init: function () {
      this.on('error', function (file, message) {
        // Manejar errores de validación
        alert(message);
        this.removeFile(file); // Eliminar el archivo que no cumple con las validaciones
      });
      this.on('removedfile', function (file) {
        // Manejar el evento de eliminación de archivo
        document.getElementById('chequeAnuladoInput').value = '';
      });
    },
  });

  var dropzoneSituacionFiscal = new Dropzone('#dropzoneSituacionFiscal', {
    url: `http://localhost:3200/uploadFileOneSituacionFiscal/${idLead}`, // Set the url for your upload script location
    paramName: 'file', // The name that will be used to transfer the file
    maxFiles: 1,
    maxFilesize: 20, // MB
    maxThumbnailFilesize: 20, // MB
    addRemoveLinks: true,
    acceptedFiles: 'application/pdf',
    accept: function (file, done) {
      // Validar si el archivo es PDF
      if (file.type !== 'application/pdf') {
        done('Solo se permiten archivos PDF.');
      } else {
        // Validar si el archivo supera el tamaño máximo
        if (file.size > 20 * 1024 * 1024) {
          // Convertir MB a bytes (1 MB = 1024 * 1024 bytes)
          done('El tamaño del archivo excede el límite de 20 MB.');
        } else {
          document.getElementById('situacionFiscal').value = 'true';
          done(); // Archivo válido
        }
      }
    },
    init: function () {
      this.on('error', function (file, message) {
        // Manejar errores de validación
        alert(message);
        this.removeFile(file); // Eliminar el archivo que no cumple con las validaciones
      });
      this.on('removedfile', function (file) {
        // Manejar el evento de eliminación de archivo
        document.getElementById('situacionFiscal').value = '';
      });
    },
  });
}


var idLead;

// Init validartion 1
let validator1 = FormValidation.formValidation(form1, {
  fields: {
    text_email: {
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
    text_name: {
      validators: {
        notEmpty: {
          message: 'Nombrey apellido es requerido',
        },
      },
    },
    text_enterprice: {
      validators: {
        notEmpty: {
          message: 'Empresa es requerida',
        },
      },
    },
    select_country: {
      validators: {
        notEmpty: {
          message: 'País es requerido',
        },
      },
    },
    text_phone: {
      validators: {
        notEmpty: {
          message: 'Telefono es requerido',
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

const submitButton = document.getElementById('kt_sign_up_submit');
submitButton.addEventListener('click', async function (e) {
  // Prevent default button action
  e.preventDefault();
  // Validate the form based on the current step
  let isValid1 = await validate1();

  let correo_electronico = document.getElementById('correo_electronico').value;
  let nombre_apellidos = document.getElementById('nombre_apellidos').value;
  let empresa = document.getElementById('empresa').value;
  let paises = document.getElementById('paises').value;
  let telefono = document.getElementById('telefono').value;

  let form1 = document.getElementById('form1');

  let formStepps = document.getElementById('formStepps');

  let res = {
    fullName: nombre_apellidos,
    email: correo_electronico,
    corporate: empresa,
    phone: telefono,
    country: paises,
  };

  if (isValid1) {
    const response = await axios({
      method: 'post',
      url: '/registerStepOne',
      headers: {
        'Content-Type': 'application/json',
      },
      data: res,
    });

    //Crear función para enviar correo

    e.preventDefault();
    idLead = response.data;
    initializeDropzone(idLead);
    form1.classList.add('d-none');
    formStepps.classList.remove('d-none');
    formStepps.classList.add('d-block');
  }
});

// Function to validate Step 1
const validate1 = async () => {
  return new Promise((resolve) => {
    validator1.validate().then((status) => {
      resolve(status === 'Valid');
    });
  });
};
