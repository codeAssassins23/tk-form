/* eslint-disable prettier/prettier */
const form = document.getElementById('kt_sign_up_form');

// Init validartion 1
let validatorStep1 = FormValidation.formValidation(form, {
  fields: {
    text_email: {
      validators: {
        emailAddress: {
          message: 'El contenido no es válidos',
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

submitButton.addEventListener('click', async function () {});

// Function to validate Step 1
const validateStep1 = async () => {
  return new Promise((resolve) => {
    validatorStep1.validate().then((status) => {
      resolve(status === 'Valid');
    });
  });
};
