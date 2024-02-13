/* eslint-disable prettier/prettier */

<<<<<<< HEAD
function Progres(stepp) {
  let progress_bar = document.getElementById('progress_bar');
  let actual_stepp = document.getElementById('actual_stepp');
  let porcent = stepp * 16.6;
  progress_bar.style.width = `${porcent}%`;
  actual_stepp.innerHTML = '';
  actual_stepp.innerHTML = stepp;
=======
var stepsData = {};
function getData() {
  // Recorrer todos los inputs visibles, incluidos textarea y select
  $("#kt_sign_up_form :input:visible").each(function() {
    var type = $(this).attr('type');
    var name = $(this).attr('name');
    var value = $(this).val();

    // Manejar checkboxes
    if (type === 'checkbox') {
        stepsData[name] = $(this).is(':checked');
    }
    // Manejar radio buttons
    else if (type === 'radio') {
        if ($(this).is(':checked')) {
            stepsData[name] = value;
        }
    }
    // Manejar todos los otros tipos de inputs (incluidos text, textarea, select)
    else {
        stepsData[name] = value;
    }
  });

  return stepsData;
>>>>>>> 90dcce1515e292d45c93e81460c19816c98c5efc
}

const form = document.getElementById('kt_sign_up_form');

// Stepper lement
var element = document.querySelector('#kt_stepper_example_basic');

// Initialize Stepper
var stepper = new KTStepper(element);

// Init validartion 1
let validaterStep1 = FormValidation.formValidation(form, {
  fields: {
    corporateName: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    tradeNameOfDBA: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    state: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    city: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    postalCode: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    address: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    emailInfomation: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    phoneInformation: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    website: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    TaxIdentificationNumber: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    industry: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    natureOfBusiness: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    DateOfIncorporation: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    typeOfBusiness: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    isTheApplicant: {
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
const validateStep1 = async () => {
  return new Promise((resolve) => {
    validaterStep1.validate().then((status) => {
      resolve(status === 'Valid');
    });
  });
};

let stepp_1 = document.getElementById('stepp_1');

console.log(stepp_1);
stepp_1.addEventListener('click', async function () {
  let isValidStep1 = await validateStep1();
  
  if (isValidStep1) {
    console.log(stepsData);
    stepper.goNext();
    Progres(2);
  }
});
