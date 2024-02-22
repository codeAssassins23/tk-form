/* eslint-disable prettier/prettier */
const form1 = document.getElementById('kt_sign_up_form_first');
function initializeDropzone(idLead) {
  var dropzoneActaConstitutiva = new Dropzone('#dropzoneActaConstitutiva', {
    url: `/uploadFilesOne/${idLead}`, // Set the url for your upload script location
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
    url: `/uploadFilesTwo/${idLead}`, // Set the url for your upload script location
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
    url: `/uploadFilesThree/${idLead}`, // Set the url for your upload script location
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
      url: `/uploadFilesFour/${idLead}`, // Set the url for your upload script location
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
      url: `/uploadFilesFive/${idLead}`, // Set the url for your upload script location
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
    url: `/uploadFilesSix/${idLead}`, // Set the url for your upload script location
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
    url: `/uploadFilethreUSD/${idLead}`, // Set the url for your upload script location
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
    url: `/uploadFileOneSituacionFiscal/${idLead}`, // Set the url for your upload script location
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
          regexp: /^[a-zA-Z0-9.ñÑ_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'El contenido no es válido',
        },
        notEmpty: {
          message: 'Email es requerido',
        },
      },
    },
    text_name: {
      validators: {
        regexp: {
          regexp: /^[a-zA-Z ]+$/,
          message: 'El contenido no es válido',
        },
        notEmpty: {
          message: 'Nombre y apellido es requerido',
        },
      },
    },
    text_enterprice: {
      validators: {
        regexp: {
          regexp: /^[a-zA-Z ]+$/,
          message: 'El contenido no es válido',
        },
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
        // regexp: {
        //   regexp: /^[0-9]+$/,
        //   message: 'El contenido no es válido',
        // },
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

  let form2 = document.getElementById('form2');

  let res = {
    fullName: nombre_apellidos,
    email: correo_electronico,
    corporate: empresa,
    phone: telefono,
    country: paises,
  };

  if (isValid1) {
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

    // Show page loading
    KTApp.showPageLoading();
    const response = await axios({
      method: 'post',
      url: '/registerStepOne',
      headers: {
        'Content-Type': 'application/json',
      },
      data: res,
    });
    console.log(response.data);
    if (response.data.message === 'Usuario ya registrado') {
      KTApp.hidePageLoading();
      loadingEl.remove();
      Swal.fire({
        icon: 'error',
        title: '¡Correo electrónico ya registrado!',
        html: `${response.data.email} ya está registrado en nuestro sistema.`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Contactar con un Asesor',
        confirmButtonAriaLabel: 'Contactar con un Asesor',
        cancelButtonText: 'Cambiar correo',
        cancelButtonAriaLabel: 'Cambiar correo',
        customClass: {
          confirmButton: 'btn btn-primary', // Clase para estilos personalizados
          cancelButton:
            'btn btn-outline btn-outline-dashed btn-outline-primary btn-active-light-primary', // Clase para estilos personalizados
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(
            'https://api.whatsapp.com/send?phone=526564106480&text=Buenos+d%C3%ADas%2C+por+favor+quisiera+m%C3%A1s+informaci%C3%B3n.',
            '_blank',
          );
        }
      });
    } else {
      KTApp.hidePageLoading();
      loadingEl.remove();
      e.preventDefault();
      idLead = response.data;
      initializeDropzone(idLead);
      form1.classList.add('d-none');
      form2.classList.remove('d-none');
      form2.classList.add('d-block');
    }
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
