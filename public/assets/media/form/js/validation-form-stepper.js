/* eslint-disable prettier/prettier */
const form = document.getElementById('kt_sign_up_form');

// Init validartion 1
let validatorStep1 = FormValidation.formValidation(form, {
  fields: {
    corporateName: {
      validators: {
        notEmpty: {
          message: 'Email es requerido',
        },
      },
    },
    tradeNameOfDBA: {
      validators: {
        notEmpty: {
          message: 'Nombrey apellido es requerido',
        },
      },
    },
    state: {
      validators: {
        notEmpty: {
          message: 'Empresa es requerida',
        },
      },
    },
    city: {
      validators: {
        notEmpty: {
          message: 'País es requerido',
        },
      },
    },
    postalCode: {
      validators: {
        notEmpty: {
          message: 'Telefono es requerido',
        },
      },
    },
    address: {
      validators: {
        notEmpty: {
          message: 'Empresa es requerida',
        },
      },
    },
    emailInfomation: {
      validators: {
        notEmpty: {
          message: 'País es requerido',
        },
        emailAddress: {
          message: 'El contenido no es válidos',
        },
      },
    },
    phoneInformation: {
      validators: {
        notEmpty: {
          message: 'Telefono es requerido',
        },
      },
    },
    website: {
      validators: {
        notEmpty: {
          message: 'Empresa es requerida',
        },
      },
    },
    TaxIdentificationNumber: {
      validators: {
        notEmpty: {
          message: 'País es requerido',
        },
      },
    },
    industry: {
      validators: {
        notEmpty: {
          message: 'Telefono es requerido',
        },
      },
    },
    natureOfBusiness: {
      validators: {
        notEmpty: {
          message: 'Telefono es requerido',
        },
      },
    },
    DateOfIncorporation: {
      validators: {
        notEmpty: {
          message: 'Empresa es requerida',
        },
      },
    },
    typeOfBusiness: {
      validators: {
        notEmpty: {
          message: 'País es requerido',
        },
      },
      isTheApplicant: {
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
  },
});

const submitButton = document.getElementsByClassName('stepp_1');

submitButton.addEventListener('click', async function (e) {
  // Prevent default button action
  e.preventDefault();
  // Validate the form based on the current step
  let isValidStep1 = await validateStep1();

  if (isValidStep1) {
    console.log('Work');
  }
});

// Function to validate Step 1
const validateStep1 = async () => {
  return new Promise((resolve) => {
    validatorStep1.validate().then((status) => {
      resolve(status === 'Valid');
    });
  });
};
