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
    metodoPay: {
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    nameBank:{
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    addressBank:{
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    accountNumber:{
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    routingNumber:{
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    typeAccount:{
      validators: {
        notEmpty: {
          message: 'Este campo es obligatorio',
        },
      },
    },
    chequeAnulado:{
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
  let bankCodeNumber = document.getElementById('bankCodeNumber');
  let bankCodeNumberDIV = document.getElementById('bankCodeNumberDIV');
  let country = document.getElementById('country');
  let typeOfBusiness = document.getElementById('typeOfBusiness1');
  let bankCodeIBANDIV = document.getElementById('bankCodeIBANDIV');
  let typeOfBusinessUSD = document.getElementById('typeOfBusinessUSD');
  let typeofBussinesOTHERS = document.getElementById('typeofBussinesOTHERS');

  if (valorSeleccionado === "mxn") {
      mxn.style.display = 'block';
      usd.style.display = 'none';
      typeOfBusinessUSD.style.display = 'none';
      validaterStep1.disableValidator("typeOfBusinessUSD");

      typeOfBusiness.style.display = 'block';
      typeofBussinesOTHERS.style.display = 'block';
      validaterStep1.enableValidator("typeOfBusiness");

      country.style.display = 'none';
      validaterStep1.disableValidator("country");

      bankCodeNumber.style.display = 'block';
      bankCodeNumberDIV.style.display = 'block';
      bankCodeNumberDIV.classList.add('col');

      bankCodeIBANDIV.style.display = 'none';
      validatorStep2.disableValidator('bankIBAN');
      
      validatorStep3.disableValidator('metodoPay');
      validatorStep3.disableValidator('nameBank');
      validatorStep3.disableValidator('addressBank');
      validatorStep3.disableValidator('accountNumber');
      validatorStep3.disableValidator('routingNumber');
      validatorStep3.disableValidator('typeAccount');
      validatorStep3.disableValidator('chequeAnulado');

      validatorStep2.enableValidator('bankCodeNumber');
      validatorStep3.enableValidator('actaConstitutiva');
      validatorStep3.enableValidator('cedulaFiscal');
      validatorStep3.enableValidator('actaPoderes');
      validatorStep3.enableValidator('identificacionTodosSocios');
      validatorStep3.enableValidator('comprobanteDomicilio');

  } else if (valorSeleccionado === "usd") {
      mxn.style.display = 'none';
      usd.style.display = 'block';
      typeOfBusinessUSD.style.display = 'block';
      validaterStep1.enableValidator("typeOfBusinessUSD");

      typeOfBusiness.style.display = 'none';
      typeofBussinesOTHERS.style.display = 'none';
      validaterStep1.disableValidator("typeOfBusiness");

      country.style.display = 'none';
      validaterStep1.disableValidator("country");

      bankCodeNumberDIV.style.display = 'none';
      bankCodeNumber.style.display = 'none';
      bankCodeNumberDIV.classList.remove('col');

      bankCodeIBANDIV.style.display = 'none';
      validatorStep2.disableValidator('bankIBAN');

      validatorStep2.disableValidator('bankCodeNumber');
      validatorStep3.disableValidator('actaConstitutiva');
      validatorStep3.disableValidator('cedulaFiscal');
      validatorStep3.disableValidator('actaPoderes');
      validatorStep3.disableValidator('identificacionTodosSocios');
      validatorStep3.disableValidator('comprobanteDomicilio');

      validatorStep3.enableValidator('metodoPay');
      validatorStep3.enableValidator('nameBank');
      validatorStep3.enableValidator('addressBank');
      validatorStep3.enableValidator('accountNumber');
      validatorStep3.enableValidator('routingNumber');
      validatorStep3.enableValidator('typeAccount');
      validatorStep3.enableValidator('chequeAnulado');
  } else if (valorSeleccionado === "word"){
      mxn.style.display = 'block';
      usd.style.display = 'none';
      typeOfBusinessUSD.style.display = 'none';
      validaterStep1.disableValidator("typeOfBusinessUSD");

      bankCodeIBANDIV.style.display = 'block';
      validatorStep2.enableValidator('bankIBAN');

      typeOfBusiness.style.display = 'none';
      typeofBussinesOTHERS.style.display = 'block';
      validaterStep1.enableValidator("typeOfBusiness");

      country.style.display = 'block';
      validaterStep1.enableValidator("country");

      bankCodeNumberDIV.style.display = 'none';
      bankCodeNumber.style.display = 'none';
      bankCodeNumberDIV.classList.remove('col');

      validatorStep2.disableValidator('bankCodeNumber');
      validatorStep3.disableValidator('metodoPay');
      validatorStep3.disableValidator('nameBank');
      validatorStep3.disableValidator('addressBank');
      validatorStep3.disableValidator('accountNumber');
      validatorStep3.disableValidator('routingNumber');
      validatorStep3.disableValidator('typeAccount');
      validatorStep3.disableValidator('chequeAnulado');

      validatorStep3.enableValidator('actaConstitutiva');
      validatorStep3.enableValidator('cedulaFiscal');
      validatorStep3.enableValidator('actaPoderes');
      validatorStep3.enableValidator('identificacionTodosSocios');
      validatorStep3.enableValidator('comprobanteDomicilio');
  }
  // Aquí puedes añadir lo que desees hacer con el valor seleccionado
  console.log("País seleccionado: ", valorSeleccionado);

  // Por ejemplo, podrías hacer una solicitud AJAX basada en la selección
  // o actualizar dinámicamente otros componentes de la UI según la necesidad.
});

//pay en  pais estados unidos
let radiosPay = document.querySelectorAll('input[type="radio"][name="metodoPay"]');

function toggleDivMetodoPay() {
  if(this.value === 'Transferencia' || this.value === 'No aplicable'){
    document.getElementById('groupInfoBankPay').style.display = 'none';
    document.getElementById('chequeAnulado').style.display = 'none';

    validatorStep3.disableValidator('chequeAnulado');
    validatorStep3.disableValidator('typeAccount');
    validatorStep3.disableValidator('routingNumber');
    validatorStep3.disableValidator('accountNumber');
    validatorStep3.disableValidator('addressBank');
    validatorStep3.disableValidator('nameBank');
    //deshabilitar validation
  } else if(this.value === 'Cheque'){
    document.getElementById('groupInfoBankPay').style.display = 'block';
    document.getElementById('chequeAnulado').style.display = 'none';
    validatorStep3.disableValidator('chequeAnulado');
    validatorStep3.enableValidator('typeAccount');
    validatorStep3.enableValidator('routingNumber');
    validatorStep3.enableValidator('accountNumber');
    validatorStep3.enableValidator('addressBank');
    validatorStep3.enableValidator('nameBank');

    //habilitar validation
  } else if(this.value === 'ACH Débito Directo'){
    document.getElementById('groupInfoBankPay').style.display = 'block';
    document.getElementById('chequeAnulado').style.display = 'block';
    validatorStep3.enableValidator('chequeAnulado');
    validatorStep3.enableValidator('typeAccount');
    validatorStep3.enableValidator('routingNumber');
    validatorStep3.enableValidator('accountNumber');
    validatorStep3.enableValidator('addressBank');
    validatorStep3.enableValidator('nameBank');
    //habilitar validation
  }
}

radiosPay.forEach(function (radio) {
  radio.addEventListener('change', toggleDivMetodoPay);
});

//dropzones para resto del muno y para mexico de acuerdo al radio input de tipo de empresa

// Selecciona todos los inputs de tipo radio con el nombre 'typeOfBusiness'
var radios = document.querySelectorAll('input[type="radio"][name="typeOfBusiness"]');

// Función para mostrar/ocultar el div basado en la selección
function toggleDivPersonaFisica() {
  if(this.value === 'Persona física') {
    document.getElementById('actaConstitutivaDiv').style.display = 'none';
    document.getElementById('actaPoderesDiv').style.display = 'none';
    document.getElementById('situacionFiscalDiv').style.display = 'block';
    validatorStep3.disableValidator('actaPoderes');
    validatorStep3.disableValidator('actaConstitutiva');
  } else {
    document.getElementById('actaConstitutivaDiv').style.display = 'block';
    document.getElementById('actaPoderesDiv').style.display = 'block';
    document.getElementById('situacionFiscalDiv').style.display = 'none';
    validatorStep3.enableValidator('actaPoderes');
    validatorStep3.enableValidator('actaConstitutiva');
  }
}

// Agrega un event listener a cada radio button
radios.forEach(function(radio) {
  radio.addEventListener('change', toggleDivPersonaFisica);
});

// Llama a la función al cargar para establecer el estado inicial correcto
toggleDivPersonaFisica();


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
