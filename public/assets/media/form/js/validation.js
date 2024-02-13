/* eslint-disable prettier/prettier */
const form1 = document.getElementById('kt_sign_up_form_first');

// Init validartion 1
let validator1 = FormValidation.formValidation(form1, {
  fields: {
    text_email: {
      validators: {
        regexp: {
          regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'El contenido no es válido',
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
let idLead;
submitButton.addEventListener('click', async function (e) {
  // Prevent default button action
  e.preventDefault();
  // Validate the form based on the current step
  let isValid1 = await validate1();

  let correo_electronico = document.getElementById('correo_electronico').value;
  let nombre_apellidos = document.getElementById('nombre_apellidos').value;
  let empresa = document.getElementById('empresa').value;
  let paises = document.getElementById('paises').value;
  let telefono = document.getElementById('telefono').value;

  let form1 = document.getElementById('form1');

  let formStepps = document.getElementById('formStepps');

  let res = {
    fullName: nombre_apellidos,
    email: correo_electronico,
    corporate: empresa,
    phone: telefono,
    country: paises,
  };

  if (isValid1) {
    const response = await axios({
      method: 'post',
      url: '/registerStepOne',
      headers: {
        'Content-Type': 'application/json',
      },
      data: res,
    });

    e.preventDefault();
    idLead = response.data;

    form1.classList.add('d-none');
    formStepps.classList.remove('d-none');
    formStepps.classList.add('d-block');

  }
});

// Function to validate Step 1
const validate1 = async () => {
  return new Promise((resolve) => {
    validator1.validate().then((status) => {
      resolve(status === 'Valid');
    });
  });
};
