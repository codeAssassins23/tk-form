/* eslint-disable prettier/prettier */
const form = document.getElementById('kt_docs_formvalidation_text');

// Init validartion 1
let validatorStep1 = FormValidation.formValidation(form, {
  fields: {
    "text_email": {
      validators: {
        emailAddress: {
          message: 'El contenido no es válidos',
        },
        notEmpty: {
          message: 'Email es requerido',
        },
      },
    },
    "text_name": {
      validators: {
        notEmpty: {
          message: 'Nombrey apellido es requerido',
        },
      },
    },
    "text_enterprice": {
      validators: {
        notEmpty: {
          message: 'Empresa es requerida',
        },
      },
    },
    "select_country": {
      validators: {
        notEmpty: {
          message: 'País es requerido',
        },
      },
    },
    "text_phone": {
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
    if (index === 0) {
        // Validate the form for step 1
        let isValidStep1 = await validateStep1();

        if (isValidStep1) {
            // Move to the next step if validation is successful
            step1Data = getStep1Data();
            stepper.goNext();
            index += 1;
        }
    } else if (index === 1) {
        // Validate the form for step 2
        let isValidStep2 = await validateStep2();
        if (isValidStep2) {
            // Move to the next step if validation is successful
            step2Data = getStep2Data();
            stepper.goNext();
            index += 1;
            // Generate HTML for step 3 and append it to a container
            generateStep3HTML(step1Data, step2Data);
 }
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