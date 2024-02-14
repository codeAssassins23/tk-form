/* eslint-disable prettier/prettier */

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
      resolve(
        status === 'Valid'
      );
    });
  });
};


// Escucha el evento 'change' en el select
$('#paises').on('change', function(e) {
  // Obtiene el valor seleccionado
  var valorSeleccionado = $(this).val();
  let mxn = document.getElementById('mxn');
  let usd = document.getElementById('usd');

  if (valorSeleccionado === "mxn") {
      mxn.style.display = 'block';
      usd.style.display = 'none';
      validatorStep3.enableValidator('actaConstitutiva');
      validatorStep3.enableValidator('cedulaFiscal');
      validatorStep3.enableValidator('actaPoderes');
      validatorStep3.enableValidator('identificacionTodosSocios');
      validatorStep3.enableValidator('comprobanteDomicilio');

  } else if (valorSeleccionado === "usd") {
      mxn.style.display = 'none';
      usd.style.display = 'block';
      validatorStep3.disableValidator('actaConstitutiva');
      validatorStep3.disableValidator('cedulaFiscal');
      validatorStep3.disableValidator('actaPoderes');
      validatorStep3.disableValidator('identificacionTodosSocios');
      validatorStep3.disableValidator('comprobanteDomicilio');
  }
  // Aquí puedes añadir lo que desees hacer con el valor seleccionado
  console.log("País seleccionado: ", valorSeleccionado);

  // Por ejemplo, podrías hacer una solicitud AJAX basada en la selección
  // o actualizar dinámicamente otros componentes de la UI según la necesidad.
});

//step 3
let stepp_3_prev = document.getElementById('stepp_3_prev');

stepp_3_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
  Progres(2);
});

let stepp_3 = document.getElementById('stepp_3');

stepp_3.addEventListener('click', async function () {
  let isValidStep3 = await validateStep3();
  console.log(isValidStep3);
  console.log("uwu")
  if (isValidStep3) {
    getData();
    console.log(stepsData);
    stepper.goNext();
    Progres(4);
  }
});
