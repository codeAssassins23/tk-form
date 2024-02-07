/* eslint-disable prettier/prettier */
const form = document.getElementById('kt_sign_up_form');

console.log("Si form", form)

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
  let isValidStep1 = await validateStep1();

  let correo_electronico = document.getElementById("correo_electronico").value
  let nombre_apellidos = document.getElementById("nombre_apellidos").value
  let empresa = document.getElementById("empresa").value
  let paises = document.getElementById("paises").value
  let telefono = document.getElementById("telefono").value

  let res = {
    "fullName": nombre_apellidos,
    "email": correo_electronico,
    "corporate": empresa,
    "phone": telefono,
    "country": paises
  }

  if (isValidStep1) {
    await axios.post('/registerStepOne', { res });
  }
}
);

// Function to validate Step 1
const validateStep1 = async () => {
  return new Promise((resolve) => {
    validatorStep1.validate().then((status) => {
      resolve(status === 'Valid');
    });
  });
};