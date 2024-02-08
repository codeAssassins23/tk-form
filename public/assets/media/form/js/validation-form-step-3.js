var myDropzone = new Dropzone('#actaConstitutiva', {
    url: 'http://localhost:3200/admin/getHoldingAccounts', // Set the url for your upload script location
    paramName: 'file', // The name that will be used to transfer the file
    maxFiles: 10,
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
    archivosSubidos: {
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
      var archivosSubidos = myDropzone.getQueuedFiles().length > 0;
        console.log(archivosSubidos);
      // Marcar el campo oculto según si hay archivos subidos o no
      if (archivosSubidos) {
        document.getElementById("archivosSubidos").value = "true";
      } else {
        document.getElementById("archivosSubidos").value = ""; // Vaciar el campo si no hay archivos subidos
      }

      // Resolver con el estado de validación del formulario
      resolve(status === 'Valid' && archivosSubidos);
    });
  });
};

// Agregar validación de campo Dropzone
myDropzone.on("addedfile", function() {
    // Marcar el campo oculto como válido cuando se agregue un archivo al Dropzone
    document.getElementById("archivosSubidos").value = "true";
});

    //step 3
let stepp_3_prev = document.getElementById('stepp_3_prev');

stepp_3_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_3 = document.getElementById('stepp_3');

stepp_3.addEventListener('click',async function () {
    let isValidStep3 = await validateStep3();
    console.log(isValidStep3);
    if (isValidStep3) {
        stepper.goNext();
    }
});