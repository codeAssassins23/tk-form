/* eslint-disable prettier/prettier */
const form = document.getElementById('kt_sign_up_form');

// Init validartion 1
let validatorStep2 = FormValidation.formValidation(form, {
  fields: {
    text_email: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    text_name: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    text_enterprice: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    select_country: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
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

// const submitButton = document.getElementById('kt_sign_up_submit');

// submitButton.addEventListener('click', async function () {});

// Function to validate Step 1
// const validateStep2 = async () => {
//   return new Promise((resolve) => {
//     validatorStep2.validate().then((status) => {
//       resolve(status === 'Valid');
//     });
//   });
// };
