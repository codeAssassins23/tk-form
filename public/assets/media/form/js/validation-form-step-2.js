/* eslint-disable prettier/prettier */

// Init validartion 1
let validatorStep2 = FormValidation.formValidation(form, {
  fields: {
    purposeOfTransactions: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    bankCodeNumber: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    estimatedTradeAmount: {
      validators: {
        regexp: {
          regexp: /^\d+(\.\d+)?$/,
          message: 'El contenido no es válido',
        },
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    estimatedOfMonthlyTransaction: {
      validators: {
        regexp: {
          regexp: /^\d+(\.\d+)?$/,
          message: 'El contenido no es válido',
        },
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    currenciesNeeded: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    bankIBAN: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    currenciesGeneral1: {
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
const validateStep2 = async () => {
  return new Promise((resolve) => {
    validatorStep2.validate().then((status) => {
      resolve(status === 'Valid');
    });
  });
};

//step 2
let stepp_2_prev = document.getElementById('stepp_2_prev');

stepp_2_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
  Progres(1);
});

let stepp_2 = document.getElementById('stepp_2');
stepp_2.addEventListener('click', async function () {
  let isValidStep2 = await validateStep2();
  if (isValidStep2) {
    getData();
    stepper.goNext();
    Progres(3);
  }
});
