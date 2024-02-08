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

const submitButton = document.getElementById('kt_sign_up_submit');

submitButton.addEventListener('click', async function () {});

// Function to validate Step 1
const validateStep2 = async () => {
  return new Promise((resolve) => {
    validatorStep2.validate().then((status) => {
      resolve(status === 'Valid');
    });
  });
};

// Stepper lement
var element = document.querySelector('#kt_stepper_example_basic');

// Initialize Stepper
var stepper = new KTStepper(element);

//step1
let stepp_1 = document.getElementById('stepp_1');

stepp_1.addEventListener('click', function () {
  console.log('Siguiente paso');
  stepper.goNext(); // go next step
});

//step 2
let stepp_2_prev = document.getElementById('stepp_2_prev');

stepp_2_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_2 = document.getElementById('stepp_2');
console.log(stepp_2);
stepp_2.addEventListener('click', async function () {
  let isValidStep2 = await validateStep2();
  console.log(isValidStep2);
  if (isValidStep2) {
    stepper.goNext();
  }
});

let stepp_4_prev = document.getElementById('stepp_4_prev');

stepp_4_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_4 = document.getElementById('stepp_4');

stepp_4.addEventListener('click', function () {
  stepper.goNext(); // go next step
});

let stepp_5_prev = document.getElementById('stepp_5_prev');

stepp_5_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_5 = document.getElementById('stepp_5');

stepp_5.addEventListener('click', function () {
  stepper.goNext(); // go next step
});

let stepp_6_prev = document.getElementById('stepp_6_prev');

stepp_6_prev.addEventListener('click', function () {
  stepper.goPrevious(); // go next step
});

let stepp_6 = document.getElementById('stepp_6');

stepp_6.addEventListener('click', function () {
  stepper.goNext(); // go next step
});
